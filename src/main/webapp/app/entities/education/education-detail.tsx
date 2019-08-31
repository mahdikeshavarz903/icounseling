import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './education.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IEducationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class EducationDetail extends React.Component<IEducationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {educationEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate
              contentKey="iCounselingApp.education.detail.title">Education</Translate> [<b>{educationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="iCounselingApp.education.type">Type</Translate>
              </span>
            </dt>
            <dd>{educationEntity.type}</dd>
          </dl>
          <Button tag={Link} to="/entity/education" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/education/${educationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({education}: IRootState) => ({
  educationEntity: education.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationDetail);
