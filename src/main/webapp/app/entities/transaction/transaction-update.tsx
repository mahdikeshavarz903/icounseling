import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getVisitors} from 'app/entities/visitor/visitor.reducer';
import {createEntity, getEntity, reset, updateEntity} from './transaction.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ITransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface ITransactionUpdateState {
  isNew: boolean;
  visitorId: string;
}

export class TransactionUpdate extends React.Component<ITransactionUpdateProps, ITransactionUpdateState> {
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
      const {transactionEntity} = this.props;
      const entity = {
        ...transactionEntity,
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
    this.props.history.push('/entity/transaction');
  };

  render() {
    const {transactionEntity, visitors, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iCounselingApp.transaction.home.createOrEditLabel">
              <Translate contentKey="iCounselingApp.transaction.home.createOrEditLabel">Create or edit a
                Transaction</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : transactionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="transaction-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="transaction-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="totalAmountLabel" for="transaction-totalAmount">
                    <Translate contentKey="iCounselingApp.transaction.totalAmount">Total Amount</Translate>
                  </Label>
                  <AvField
                    id="transaction-totalAmount"
                    type="string"
                    className="form-control"
                    name="totalAmount"
                    validate={{
                      required: {value: true, errorMessage: translate('entity.validation.required')},
                      number: {value: true, errorMessage: translate('entity.validation.number')}
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" check>
                    <AvInput id="transaction-status" type="checkbox" className="form-control" name="status"/>
                    <Translate contentKey="iCounselingApp.transaction.status">Status</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="transaction-visitor">
                    <Translate contentKey="iCounselingApp.transaction.visitor">Visitor</Translate>
                  </Label>
                  <AvInput id="transaction-visitor" type="select" className="form-control" name="visitorId">
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
                <Button tag={Link} id="cancel-save" to="/entity/transaction" replace color="info">
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
  transactionEntity: storeState.transaction.entity,
  loading: storeState.transaction.loading,
  updating: storeState.transaction.updating,
  updateSuccess: storeState.transaction.updateSuccess
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
)(TransactionUpdate);
