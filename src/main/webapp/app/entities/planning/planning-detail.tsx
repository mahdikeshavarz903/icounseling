import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './planning.reducer';
import { IPlanning } from 'app/shared/model/planning.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlanningDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlanningDetail extends React.Component<IPlanningDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { planningEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.planning.detail.title">Planning</Translate> [<b>{planningEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="iCounselingApp.planning.title">Title</Translate>
              </span>
            </dt>
            <dd>{planningEntity.title}</dd>
            <dt>
              <span id="startDateTime">
                <Translate contentKey="iCounselingApp.planning.startDateTime">Start Date Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={planningEntity.startDateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDateTime">
                <Translate contentKey="iCounselingApp.planning.endDateTime">End Date Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={planningEntity.endDateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="iCounselingApp.planning.description">Description</Translate>
              </span>
            </dt>
            <dd>{planningEntity.description}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.planning.counselor">Counselor</Translate>
            </dt>
            <dd>{planningEntity.counselorId ? planningEntity.counselorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/planning" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/planning/${planningEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ planning }: IRootState) => ({
  planningEntity: planning.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningDetail);
