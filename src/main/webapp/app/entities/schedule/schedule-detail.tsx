import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './schedule.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT} from 'app/config/constants';

export interface IScheduleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class ScheduleDetail extends React.Component<IScheduleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {scheduleEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.schedule.detail.title">Schedule</Translate> [<b>{scheduleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="iCounselingApp.schedule.title">Title</Translate>
              </span>
            </dt>
            <dd>{scheduleEntity.title}</dd>
            <dt>
              <span id="dateTime">
                <Translate contentKey="iCounselingApp.schedule.dateTime">Date Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={scheduleEntity.dateTime} type="date" format={APP_DATE_FORMAT}/>
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="iCounselingApp.schedule.description">Description</Translate>
              </span>
            </dt>
            <dd>{scheduleEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/schedule" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/schedule/${scheduleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({schedule}: IRootState) => ({
  scheduleEntity: schedule.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail);
