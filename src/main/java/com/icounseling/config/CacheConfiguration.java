package com.icounseling.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.icounseling.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.icounseling.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.icounseling.domain.User.class.getName());
            createCache(cm, com.icounseling.domain.Authority.class.getName());
            createCache(cm, com.icounseling.domain.User.class.getName() + ".authorities");
            createCache(cm, com.icounseling.domain.CounselingCase.class.getName());
            createCache(cm, com.icounseling.domain.Counselor.class.getName());
            createCache(cm, com.icounseling.domain.Counselor.class.getName() + ".posts");
            createCache(cm, com.icounseling.domain.Counselor.class.getName() + ".documents");
            createCache(cm, com.icounseling.domain.Counselor.class.getName() + ".timeReserveds");
            createCache(cm, com.icounseling.domain.Counselor.class.getName() + ".plannings");
            createCache(cm, com.icounseling.domain.Counselor.class.getName() + ".counselingCases");
            createCache(cm, com.icounseling.domain.Reseume.class.getName());
            createCache(cm, com.icounseling.domain.Education.class.getName());
            createCache(cm, com.icounseling.domain.Education.class.getName() + ".reseumes");
            createCache(cm, com.icounseling.domain.Planning.class.getName());
            createCache(cm, com.icounseling.domain.Planning.class.getName() + ".tasks");
            createCache(cm, com.icounseling.domain.Task.class.getName());
            createCache(cm, com.icounseling.domain.Reminder.class.getName());
            createCache(cm, com.icounseling.domain.TimeReserved.class.getName());
            createCache(cm, com.icounseling.domain.Visitor.class.getName());
            createCache(cm, com.icounseling.domain.Visitor.class.getName() + ".transactions");
            createCache(cm, com.icounseling.domain.Visitor.class.getName() + ".jobs");
            createCache(cm, com.icounseling.domain.Job.class.getName());
            createCache(cm, com.icounseling.domain.JobHistory.class.getName());
            createCache(cm, com.icounseling.domain.Schedule.class.getName());
            createCache(cm, com.icounseling.domain.Document.class.getName());
            createCache(cm, com.icounseling.domain.Post.class.getName());
            createCache(cm, com.icounseling.domain.Post.class.getName() + ".comments");
            createCache(cm, com.icounseling.domain.Score.class.getName());
            createCache(cm, com.icounseling.domain.Rate.class.getName());
            createCache(cm, com.icounseling.domain.Comment.class.getName());
            createCache(cm, com.icounseling.domain.Library.class.getName());
            createCache(cm, com.icounseling.domain.Library.class.getName() + ".categories");
            createCache(cm, com.icounseling.domain.Category.class.getName());
            createCache(cm, com.icounseling.domain.Category.class.getName() + ".documents");
            createCache(cm, com.icounseling.domain.Transaction.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
