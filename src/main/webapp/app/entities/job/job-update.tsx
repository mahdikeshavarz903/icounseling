import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getVisitors} from 'app/entities/visitor/visitor.reducer';
import {createEntity, getEntity, reset, updateEntity} from './job.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IJobUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IJobUpdateState {
  isNew: boolean;
  visitorId: string;
}

export class JobUpdate extends React.Component<IJobUpdateProps, IJobUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getVisitors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {jobEntity} = this.props;
      const entity = {
        ...jobEntity,
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
    this.props.history.push('/entity/job');
  };

  render() {
    const {jobEntity, visitors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.job.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.job.home.createOrEditLabel">Create or edit a Job</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jobEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="job-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="job-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="jobTitleLabel" for="job-jobTitle">
                    <Translate contentKey="iCounselingApp.job.jobTitle">Job Title</Translate>
                  </Label>
                  <AvField id="job-jobTitle" type="text" name="jobTitle"/>
                </AvGroup>
                <AvGroup>
                  <Label id="minSalaryLabel" for="job-minSalary">
                    <Translate contentKey="iCounselingApp.job.minSalary">Min Salary</Translate>
                  </Label>
                  <AvField id="job-minSalary" type="string" className="form-control" name="minSalary"/>
                </AvGroup>
                <AvGroup>
                  <Label id="maxSalaryLabel" for="job-maxSalary">
                    <Translate contentKey="iCounselingApp.job.maxSalary">Max Salary</Translate>
                  </Label>
                  <AvField id="job-maxSalary" type="string" className="form-control" name="maxSalary"/>
                </AvGroup>
                <AvGroup>
                  <Label for="job-visitor">
                    <Translate contentKey="iCounselingApp.job.visitor">Visitor</Translate>
                  </Label>
                  <AvInput id="job-visitor" type="select" className="form-control" name="visitorId">
                    <option value="" key="0"/>
                    {visitors
                      ? visitors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/job" replace color="info">
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
  visitors: storeState.visitor.entities,
  jobEntity: storeState.job.entity,
  loading: storeState.job.loading,
  updating: storeState.job.updating,
  updateSuccess: storeState.job.updateSuccess
});

const mapDispatchToProps = {
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
)(JobUpdate);
