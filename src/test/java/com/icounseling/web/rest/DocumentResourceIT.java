package com.icounseling.web.rest;

import com.icounseling.ICounselingApp;
import com.icounseling.domain.Document;
import com.icounseling.domain.enumeration.DocumentFormat;
import com.icounseling.domain.enumeration.PaymentType;
import com.icounseling.repository.DocumentRepository;
import com.icounseling.service.DocumentService;
import com.icounseling.service.dto.DocumentDTO;
import com.icounseling.service.mapper.DocumentMapper;
import com.icounseling.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.icounseling.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
/**
 * Integration tests for the {@link DocumentResource} REST controller.
 */
@SpringBootTest(classes = ICounselingApp.class)
public class DocumentResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DESCRIPTION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESCRIPTION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESCRIPTION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESCRIPTION_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;
    private static final Float SMALLER_PRICE = 1F - 1F;

    private static final LocalDate DEFAULT_PUBLISHED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PUBLISHED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_PUBLISHED_DATE = LocalDate.ofEpochDay(-1L);

    private static final PaymentType DEFAULT_PAYMENT_TYPE = PaymentType.FREE;
    private static final PaymentType UPDATED_PAYMENT_TYPE = PaymentType.PAID;

    private static final DocumentFormat DEFAULT_DOCUMENT_FORMAT = DocumentFormat.PDF;
    private static final DocumentFormat UPDATED_DOCUMENT_FORMAT = DocumentFormat.DOCX;

    private static final byte[] DEFAULT_IMAGES_GALLERY = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGES_GALLERY = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGES_GALLERY_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGES_GALLERY_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentMapper documentMapper;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDocumentMockMvc;

    private Document document;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentResource documentResource = new DocumentResource(documentService);
        this.restDocumentMockMvc = MockMvcBuilders.standaloneSetup(documentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Document createEntity(EntityManager em) {
        Document document = new Document()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .descriptionContentType(DEFAULT_DESCRIPTION_CONTENT_TYPE)
            .price(DEFAULT_PRICE)
            .publishedDate(DEFAULT_PUBLISHED_DATE)
            .paymentType(DEFAULT_PAYMENT_TYPE)
            .documentFormat(DEFAULT_DOCUMENT_FORMAT)
            .imagesGallery(DEFAULT_IMAGES_GALLERY)
            .imagesGalleryContentType(DEFAULT_IMAGES_GALLERY_CONTENT_TYPE)
            .tag(DEFAULT_TAG);
        return document;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Document createUpdatedEntity(EntityManager em) {
        Document document = new Document()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .price(UPDATED_PRICE)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .documentFormat(UPDATED_DOCUMENT_FORMAT)
            .imagesGallery(UPDATED_IMAGES_GALLERY)
            .imagesGalleryContentType(UPDATED_IMAGES_GALLERY_CONTENT_TYPE)
            .tag(UPDATED_TAG);
        return document;
    }

    @BeforeEach
    public void initTest() {
        document = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocument() throws Exception {
        int databaseSizeBeforeCreate = documentRepository.findAll().size();

        // Create the Document
        DocumentDTO documentDTO = documentMapper.toDto(document);
        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isCreated());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeCreate + 1);
        Document testDocument = documentList.get(documentList.size() - 1);
        assertThat(testDocument.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testDocument.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDocument.getDescriptionContentType()).isEqualTo(DEFAULT_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDocument.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testDocument.getPublishedDate()).isEqualTo(DEFAULT_PUBLISHED_DATE);
        assertThat(testDocument.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
        assertThat(testDocument.getDocumentFormat()).isEqualTo(DEFAULT_DOCUMENT_FORMAT);
        assertThat(testDocument.getImagesGallery()).isEqualTo(DEFAULT_IMAGES_GALLERY);
        assertThat(testDocument.getImagesGalleryContentType()).isEqualTo(DEFAULT_IMAGES_GALLERY_CONTENT_TYPE);
        assertThat(testDocument.getTag()).isEqualTo(DEFAULT_TAG);
    }

    @Test
    @Transactional
    public void createDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentRepository.findAll().size();

        // Create the Document with an existing ID
        document.setId(1L);
        DocumentDTO documentDTO = documentMapper.toDto(document);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentRepository.findAll().size();
        // set the field null
        document.setTitle(null);

        // Create the Document, which fails.
        DocumentDTO documentDTO = documentMapper.toDto(document);

        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentRepository.findAll().size();
        // set the field null
        document.setPrice(null);

        // Create the Document, which fails.
        DocumentDTO documentDTO = documentMapper.toDto(document);

        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTagIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentRepository.findAll().size();
        // set the field null
        document.setTag(null);

        // Create the Document, which fails.
        DocumentDTO documentDTO = documentMapper.toDto(document);

        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocuments() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        // Get all the documentList
        restDocumentMockMvc.perform(get("/api/documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(document.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].descriptionContentType").value(hasItem(DEFAULT_DESCRIPTION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESCRIPTION))))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].publishedDate").value(hasItem(DEFAULT_PUBLISHED_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].documentFormat").value(hasItem(DEFAULT_DOCUMENT_FORMAT.toString())))
            .andExpect(jsonPath("$.[*].imagesGalleryContentType").value(hasItem(DEFAULT_IMAGES_GALLERY_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagesGallery").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGES_GALLERY))))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())));
    }
    
    @Test
    @Transactional
    public void getDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        // Get the document
        restDocumentMockMvc.perform(get("/api/documents/{id}", document.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(document.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.descriptionContentType").value(DEFAULT_DESCRIPTION_CONTENT_TYPE))
            .andExpect(jsonPath("$.description").value(Base64Utils.encodeToString(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.publishedDate").value(DEFAULT_PUBLISHED_DATE.toString()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()))
            .andExpect(jsonPath("$.documentFormat").value(DEFAULT_DOCUMENT_FORMAT.toString()))
            .andExpect(jsonPath("$.imagesGalleryContentType").value(DEFAULT_IMAGES_GALLERY_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagesGallery").value(Base64Utils.encodeToString(DEFAULT_IMAGES_GALLERY)))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocument() throws Exception {
        // Get the document
        restDocumentMockMvc.perform(get("/api/documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        int databaseSizeBeforeUpdate = documentRepository.findAll().size();

        // Update the document
        Document updatedDocument = documentRepository.findById(document.getId()).get();
        // Disconnect from session so that the updates on updatedDocument are not directly saved in db
        em.detach(updatedDocument);
        updatedDocument
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .price(UPDATED_PRICE)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .documentFormat(UPDATED_DOCUMENT_FORMAT)
            .imagesGallery(UPDATED_IMAGES_GALLERY)
            .imagesGalleryContentType(UPDATED_IMAGES_GALLERY_CONTENT_TYPE)
            .tag(UPDATED_TAG);
        DocumentDTO documentDTO = documentMapper.toDto(updatedDocument);

        restDocumentMockMvc.perform(put("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isOk());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeUpdate);
        Document testDocument = documentList.get(documentList.size() - 1);
        assertThat(testDocument.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testDocument.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDocument.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDocument.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testDocument.getPublishedDate()).isEqualTo(UPDATED_PUBLISHED_DATE);
        assertThat(testDocument.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
        assertThat(testDocument.getDocumentFormat()).isEqualTo(UPDATED_DOCUMENT_FORMAT);
        assertThat(testDocument.getImagesGallery()).isEqualTo(UPDATED_IMAGES_GALLERY);
        assertThat(testDocument.getImagesGalleryContentType()).isEqualTo(UPDATED_IMAGES_GALLERY_CONTENT_TYPE);
        assertThat(testDocument.getTag()).isEqualTo(UPDATED_TAG);
    }

    @Test
    @Transactional
    public void updateNonExistingDocument() throws Exception {
        int databaseSizeBeforeUpdate = documentRepository.findAll().size();

        // Create the Document
        DocumentDTO documentDTO = documentMapper.toDto(document);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentMockMvc.perform(put("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        int databaseSizeBeforeDelete = documentRepository.findAll().size();

        // Delete the document
        restDocumentMockMvc.perform(delete("/api/documents/{id}", document.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Document.class);
        Document document1 = new Document();
        document1.setId(1L);
        Document document2 = new Document();
        document2.setId(document1.getId());
        assertThat(document1).isEqualTo(document2);
        document2.setId(2L);
        assertThat(document1).isNotEqualTo(document2);
        document1.setId(null);
        assertThat(document1).isNotEqualTo(document2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentDTO.class);
        DocumentDTO documentDTO1 = new DocumentDTO();
        documentDTO1.setId(1L);
        DocumentDTO documentDTO2 = new DocumentDTO();
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
        documentDTO2.setId(documentDTO1.getId());
        assertThat(documentDTO1).isEqualTo(documentDTO2);
        documentDTO2.setId(2L);
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
        documentDTO1.setId(null);
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(documentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(documentMapper.fromId(null)).isNull();
    }
}
