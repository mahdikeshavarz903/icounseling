import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './time-reserved.reducer';
import { ITimeReserved } from 'app/shared/model/time-reserved.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimeReservedDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TimeReservedDetail extends React.Component<ITimeReservedDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { timeReservedEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.timeReserved.detail.title">TimeReserved</Translate> [<b>{timeReservedEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dateTime">
                <Translate contentKey="iCounselingApp.timeReserved.dateTime">Date Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={timeReservedEntity.dateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="iCounselingApp.timeReserved.description">Description</Translate>
              </span>
            </dt>
            <dd>{timeReservedEntity.description}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.timeReserved.counselor">Counselor</Translate>
            </dt>
            <dd>{timeReservedEntity.counselorId ? timeReservedEntity.counselorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/time-reserved" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/time-reserved/${timeReservedEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ timeReserved }: IRootState) => ({
  timeReservedEntity: timeReserved.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeReservedDetail);
