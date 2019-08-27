import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './transaction.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ITransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class TransactionDetail extends React.Component<ITransactionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {transactionEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.transaction.detail.title">Transaction</Translate> [<b>{transactionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="totalAmount">
                <Translate contentKey="iCounselingApp.transaction.totalAmount">Total Amount</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.totalAmount}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="iCounselingApp.transaction.status">Status</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.status ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.transaction.visitor">Visitor</Translate>
            </dt>
            <dd>{transactionEntity.visitorId ? transactionEntity.visitorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/transaction" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/transaction/${transactionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({transaction}: IRootState) => ({
  transactionEntity: transaction.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionDetail);
