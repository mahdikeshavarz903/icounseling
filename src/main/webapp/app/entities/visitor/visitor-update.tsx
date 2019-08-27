import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getScores} from 'app/entities/score/score.reducer';
import {getEntities as getEducations} from 'app/entities/education/education.reducer';
import {getUsers} from 'app/modules/administration/user-management/user-management.reducer';
import {getEntities as getCounselingCases} from 'app/entities/counseling-case/counseling-case.reducer';
import {getEntities as getLibraries} from 'app/entities/library/library.reducer';
import {createEntity, getEntity, reset, updateEntity} from './visitor.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IVisitorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IVisitorUpdateState {
  isNew: boolean;
  scoreId: string;
  educationId: string;
  userId: string;
  counselingCaseId: string;
  libraryId: string;
}

export class VisitorUpdate extends React.Component<IVisitorUpdateProps, IVisitorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      scoreId: '0',
      educationId: '0',
      userId: '0',
      counselingCaseId: '0',
      libraryId: '0',
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

    this.props.getScores();
    this.props.getEducations();
    this.props.getUsers();
    this.props.getCounselingCases();
    this.props.getLibraries();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {visitorEntity} = this.props;
      const entity = {
        ...visitorEntity,
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
    this.props.history.push('/entity/visitor');
  };

  render() {
    const {visitorEntity, scores, educations, users, counselingCases, libraries, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.visitor.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.visitor.home.createOrEditLabel">Create or edit a Visitor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : visitorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="visitor-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="visitor-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="visitor-score">
                    <Translate contentKey="iCounselingApp.visitor.score">Score</Translate>
                  </Label>
                  <AvInput id="visitor-score" type="select" className="form-control" name="scoreId">
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
                  <Label for="visitor-education">
                    <Translate contentKey="iCounselingApp.visitor.education">Education</Translate>
                  </Label>
                  <AvInput id="visitor-education" type="select" className="form-control" name="educationId">
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
                  <Label for="visitor-user">
                    <Translate contentKey="iCounselingApp.visitor.user">User</Translate>
                  </Label>
                  <AvInput id="visitor-user" type="select" className="form-control" name="userId">
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
                <Button tag={Link} id="cancel-save" to="/entity/visitor" replace color="info">
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
  scores: storeState.score.entities,
  educations: storeState.education.entities,
  users: storeState.userManagement.users,
  counselingCases: storeState.counselingCase.entities,
  libraries: storeState.library.entities,
  visitorEntity: storeState.visitor.entity,
  loading: storeState.visitor.loading,
  updating: storeState.visitor.updating,
  updateSuccess: storeState.visitor.updateSuccess
});

const mapDispatchToProps = {
  getScores,
  getEducations,
  getUsers,
  getCounselingCases,
  getLibraries,
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
)(VisitorUpdate);
