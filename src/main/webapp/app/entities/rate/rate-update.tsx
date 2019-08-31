import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './rate.reducer';
import { IRate } from 'app/shared/model/rate.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRateUpdateState {
  isNew: boolean;
  documentId: string;
  commentId: string;
}

export class RateUpdate extends React.Component<IRateUpdateProps, IRateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      documentId: '0',
      commentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDocuments();
    this.props.getComments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { rateEntity } = this.props;
      const entity = {
        ...rateEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/rate');
  };

  render() {
    const { rateEntity, documents, comments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.rate.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.rate.home.createOrEditLabel">Create or edit a Rate</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : rateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="rate-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="rate-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="indexLabel" for="rate-index">
                    <Translate contentKey="iCounselingApp.rate.index">Index</Translate>
                  </Label>
                  <AvField
                    id="rate-index"
                    type="string"
                    className="form-control"
                    name="index"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="rate-title">
                    <Translate contentKey="iCounselingApp.rate.title">Title</Translate>
                  </Label>
                  <AvField
                    id="rate-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/rate" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  documents: storeState.document.entities,
  comments: storeState.comment.entities,
  rateEntity: storeState.rate.entity,
  loading: storeState.rate.loading,
  updating: storeState.rate.updating,
  updateSuccess: storeState.rate.updateSuccess
});

const mapDispatchToProps = {
  getDocuments,
  getComments,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateUpdate);
