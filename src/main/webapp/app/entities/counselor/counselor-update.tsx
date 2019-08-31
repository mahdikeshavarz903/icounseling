import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getEducations} from 'app/entities/education/education.reducer';
import {getEntities as getScores} from 'app/entities/score/score.reducer';
import {getUsers} from 'app/modules/administration/user-management/user-management.reducer';
import {createEntity, getEntity, reset, updateEntity} from './counselor.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ICounselorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface ICounselorUpdateState {
  isNew: boolean;
  educationId: string;
  scoreId: string;
  userId: string;
}

export class CounselorUpdate extends React.Component<ICounselorUpdateProps, ICounselorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      educationId: '0',
      scoreId: '0',
      userId: '0',
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

    this.props.getEducations();
    this.props.getScores();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {counselorEntity} = this.props;
      const entity = {
        ...counselorEntity,
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
    this.props.history.push('/entity/counselor');
  };

  render() {
    const {counselorEntity, educations, scores, users, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.counselor.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.counselor.home.createOrEditLabel">Create or edit a
                Counselor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : counselorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="counselor-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="counselor-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="consultantTypeLabel" for="counselor-consultantType">
                    <Translate contentKey="iCounselingApp.counselor.consultantType">Consultant Type</Translate>
                  </Label>
                  <AvInput
                    id="counselor-consultantType"
                    type="select"
                    className="form-control"
                    name="consultantType"
                    value={(!isNew && counselorEntity.consultantType) || 'PSYCHOLOGY'}
                  >
                    <option value="PSYCHOLOGY">
                      <Translate contentKey="iCounselingApp.ConsultantType.PSYCHOLOGY"/>
                    </option>
                    <option value="LEGAL">
                      <Translate contentKey="iCounselingApp.ConsultantType.LEGAL"/>
                    </option>
                    <option value="FINANCIAL">
                      <Translate contentKey="iCounselingApp.ConsultantType.FINANCIAL"/>
                    </option>
                    <option value="EDUCATIONAL">
                      <Translate contentKey="iCounselingApp.ConsultantType.EDUCATIONAL"/>
                    </option>
                    <option value="MEDICAL">
                      <Translate contentKey="iCounselingApp.ConsultantType.MEDICAL"/>
                    </option>
                    <option value="INDUSTY">
                      <Translate contentKey="iCounselingApp.ConsultantType.INDUSTY"/>
                    </option>
                    <option value="COMPUTER">
                      <Translate contentKey="iCounselingApp.ConsultantType.COMPUTER"/>
                    </option>
                    <option value="MUSIC">
                      <Translate contentKey="iCounselingApp.ConsultantType.MUSIC"/>
                    </option>
                    <option value="ART">
                      <Translate contentKey="iCounselingApp.ConsultantType.ART"/>
                    </option>
                    <option value="AGRICULTURE">
                      <Translate contentKey="iCounselingApp.ConsultantType.AGRICULTURE"/>
                    </option>
                    <option value="ANIMAL_HUSBANDRY">
                      <Translate contentKey="iCounselingApp.ConsultantType.ANIMAL_HUSBANDRY"/>
                    </option>
                    <option value="SPORTS">
                      <Translate contentKey="iCounselingApp.ConsultantType.SPORTS"/>
                    </option>
                    <option value="RELIGIOUS">
                      <Translate contentKey="iCounselingApp.ConsultantType.RELIGIOUS"/>
                    </option>
                    <option value="REGISTRATION_OF_DOCUMENTS">
                      <Translate contentKey="iCounselingApp.ConsultantType.REGISTRATION_OF_DOCUMENTS"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="counselor-education">
                    <Translate contentKey="iCounselingApp.counselor.education">Education</Translate>
                  </Label>
                  <AvInput id="counselor-education" type="select" className="form-control" name="educationId">
                    <option value="" key="0"/>
                    {educations
                      ? educations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="counselor-score">
                    <Translate contentKey="iCounselingApp.counselor.score">Score</Translate>
                  </Label>
                  <AvInput id="counselor-score" type="select" className="form-control" name="scoreId">
                    <option value="" key="0"/>
                    {scores
                      ? scores.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="counselor-user">
                    <Translate contentKey="iCounselingApp.counselor.user">User</Translate>
                  </Label>
                  <AvInput id="counselor-user" type="select" className="form-control" name="userId">
                    <option value="" key="0"/>
                    {users
                      ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/counselor" replace color="info">
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
  educations: storeState.education.entities,
  scores: storeState.score.entities,
  users: storeState.userManagement.users,
  counselorEntity: storeState.counselor.entity,
  loading: storeState.counselor.loading,
  updating: storeState.counselor.updating,
  updateSuccess: storeState.counselor.updateSuccess
});

const mapDispatchToProps = {
  getEducations,
  getScores,
  getUsers,
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
)(CounselorUpdate);
