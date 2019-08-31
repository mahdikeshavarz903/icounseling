import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './reseume.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IReseumeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class ReseumeDetail extends React.Component<IReseumeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {reseumeEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.reseume.detail.title">Reseume</Translate> [<b>{reseumeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="iCounselingApp.reseume.education">Education</Translate>
            </dt>
            <dd>{reseumeEntity.educationId ? reseumeEntity.educationId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/reseume" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/reseume/${reseumeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({reseume}: IRootState) => ({
  reseumeEntity: reseume.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReseumeDetail);
