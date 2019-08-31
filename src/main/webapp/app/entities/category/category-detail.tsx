import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {byteSize, openFile, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './category.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ICategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class CategoryDetail extends React.Component<ICategoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {categoryEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.category.detail.title">Category</Translate> [<b>{categoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="images">
                <Translate contentKey="iCounselingApp.category.images">Images</Translate>
              </span>
            </dt>
            <dd>
              {categoryEntity.images ? (
                <div>
                  <a onClick={openFile(categoryEntity.imagesContentType, categoryEntity.images)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {categoryEntity.imagesContentType}, {byteSize(categoryEntity.images)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="categoryType">
                <Translate contentKey="iCounselingApp.category.categoryType">Category Type</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.categoryType}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.category.library">Library</Translate>
            </dt>
            <dd>{categoryEntity.libraryId ? categoryEntity.libraryId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/category" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/category/${categoryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({category}: IRootState) => ({
  categoryEntity: category.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetail);
