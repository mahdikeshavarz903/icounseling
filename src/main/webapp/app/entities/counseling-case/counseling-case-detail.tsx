import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './counseling-case.reducer';

// tslint:disable-next-line:no-unused-variable

export interface ICounselingCaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class CounselingCaseDetail extends React.Component<ICounselingCaseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {counselingCaseEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.counselingCase.detail.title">CounselingCase</Translate> [<b>{counselingCaseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">
                <Translate contentKey="iCounselingApp.counselingCase.status">Status</Translate>
              </span>
            </dt>
            <dd>{counselingCaseEntity.status}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.counselingCase.visitor">Visitor</Translate>
            </dt>
            <dd>{counselingCaseEntity.visitorId ? counselingCaseEntity.visitorId : ''}</dd>
            <dt>
              <Translate contentKey="iCounselingApp.counselingCase.counselor">Counselor</Translate>
            </dt>
            <dd>{counselingCaseEntity.counselorId ? counselingCaseEntity.counselorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/counseling-case" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/counseling-case/${counselingCaseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({counselingCase}: IRootState) => ({
  counselingCaseEntity: counselingCase.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounselingCaseDetail);