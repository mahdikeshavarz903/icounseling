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
import {createEntity, getEntity, reset, updateEntity} from './reseume.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IReseumeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IReseumeUpdateState {
  isNew: boolean;
  educationId: string;
}

export class ReseumeUpdate extends React.Component<IReseumeUpdateProps, IReseumeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      educationId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {reseumeEntity} = this.props;
      const entity = {
        ...reseumeEntity,
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
    this.props.history.push('/entity/reseume');
  };

  render() {
    const {reseumeEntity, educations, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.reseume.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.reseume.home.createOrEditLabel">Create or edit a Reseume</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reseumeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="reseume-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="reseume-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="reseume-education">
                    <Translate contentKey="iCounselingApp.reseume.education">Education</Translate>
                  </Label>
                  <AvInput id="reseume-education" type="select" className="form-control" name="educationId">
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
                <Button tag={Link} id="cancel-save" to="/entity/reseume" replace color="info">
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
  reseumeEntity: storeState.reseume.entity,
  loading: storeState.reseume.loading,
  updating: storeState.reseume.updating,
  updateSuccess: storeState.reseume.updateSuccess
});

const mapDispatchToProps = {
  getEducations,
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
)(ReseumeUpdate);
