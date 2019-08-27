import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getVisitors} from 'app/entities/visitor/visitor.reducer';
import {getEntities as getCounselors} from 'app/entities/counselor/counselor.reducer';
import {createEntity, getEntity, reset, updateEntity} from './counseling-case.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ICounselingCaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface ICounselingCaseUpdateState {
  isNew: boolean;
  visitorId: string;
  counselorId: string;
}

export class CounselingCaseUpdate extends React.Component<ICounselingCaseUpdateProps, ICounselingCaseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      visitorId: '0',
      counselorId: '0',
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
    this.props.getCounselors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {counselingCaseEntity} = this.props;
      const entity = {
        ...counselingCaseEntity,
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
    this.props.history.push('/entity/counseling-case');
  };

  render() {
    const {counselingCaseEntity, visitors, counselors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.counselingCase.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.counselingCase.home.createOrEditLabel">Create or edit a
                CounselingCase</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : counselingCaseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="counseling-case-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="counseling-case-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel" for="counseling-case-status">
                    <Translate contentKey="iCounselingApp.counselingCase.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="counseling-case-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && counselingCaseEntity.status) || 'OPENED'}
                  >
                    <option value="OPENED">
                      <Translate contentKey="iCounselingApp.CounselingCaseStatus.OPENED"/>
                    </option>
                    <option value="CLOSED">
                      <Translate contentKey="iCounselingApp.CounselingCaseStatus.CLOSED"/>
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="counseling-case-visitor">
                    <Translate contentKey="iCounselingApp.counselingCase.visitor">Visitor</Translate>
                  </Label>
                  <AvInput id="counseling-case-visitor" type="select" className="form-control" name="visitorId">
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
                <AvGroup>
                  <Label for="counseling-case-counselor">
                    <Translate contentKey="iCounselingApp.counselingCase.counselor">Counselor</Translate>
                  </Label>
                  <AvInput id="counseling-case-counselor" type="select" className="form-control" name="counselorId">
                    <option value="" key="0"/>
                    {counselors
                      ? counselors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/counseling-case" replace color="info">
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
  counselors: storeState.counselor.entities,
  counselingCaseEntity: storeState.counselingCase.entity,
  loading: storeState.counselingCase.loading,
  updating: storeState.counselingCase.updating,
  updateSuccess: storeState.counselingCase.updateSuccess
});

const mapDispatchToProps = {
  getVisitors,
  getCounselors,
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
)(CounselingCaseUpdate);
