import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getCounselors} from 'app/entities/counselor/counselor.reducer';
import {getEntities as getVisitors} from 'app/entities/visitor/visitor.reducer';
import {createEntity, getEntity, reset, updateEntity} from './education.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IEducationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IEducationUpdateState {
  isNew: boolean;
  counselorId: string;
  visitorId: string;
}

export class EducationUpdate extends React.Component<IEducationUpdateProps, IEducationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      counselorId: '0',
      visitorId: '0',
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

    this.props.getCounselors();
    this.props.getVisitors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {educationEntity} = this.props;
      const entity = {
        ...educationEntity,
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
    this.props.history.push('/entity/education');
  };

  render() {
    const {educationEntity, counselors, visitors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.education.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.education.home.createOrEditLabel">Create or edit a
                Education</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : educationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="education-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="education-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="education-type">
                    <Translate contentKey="iCounselingApp.education.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="education-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && educationEntity.type) || 'ASSOCIATE_DEGREE'}
                  >
                    <option value="ASSOCIATE_DEGREE">
                      <Translate contentKey="iCounselingApp.EducationDegree.ASSOCIATE_DEGREE"/>
                    </option>
                    <option value="BACHELOR_DEGREE">
                      <Translate contentKey="iCounselingApp.EducationDegree.BACHELOR_DEGREE"/>
                    </option>
                    <option value="DOCOTRAL_DEGREE">
                      <Translate contentKey="iCounselingApp.EducationDegree.DOCOTRAL_DEGREE"/>
                    </option>
                    <option value="MASTER_DEGREE">
                      <Translate contentKey="iCounselingApp.EducationDegree.MASTER_DEGREE"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/education" replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>
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
  counselors: storeState.counselor.entities,
  visitors: storeState.visitor.entities,
  educationEntity: storeState.education.entity,
  loading: storeState.education.loading,
  updating: storeState.education.updating,
  updateSuccess: storeState.education.updateSuccess
});

const mapDispatchToProps = {
  getCounselors,
  getVisitors,
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
)(EducationUpdate);
