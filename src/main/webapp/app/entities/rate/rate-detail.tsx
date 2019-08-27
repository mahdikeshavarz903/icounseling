import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './rate.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IRateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class RateDetail extends React.Component<IRateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {rateEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.rate.detail.title">Rate</Translate> [<b>{rateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="index">
                <Translate contentKey="iCounselingApp.rate.index">Index</Translate>
              </span>
            </dt>
            <dd>{rateEntity.index}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="iCounselingApp.rate.title">Title</Translate>
              </span>
            </dt>
            <dd>{rateEntity.title}</dd>
          </dl>
          <Button tag={Link} to="/entity/rate" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/rate/${rateEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({rate}: IRootState) => ({
  rateEntity: rate.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateDetail);
