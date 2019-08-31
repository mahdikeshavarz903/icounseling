import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {byteSize, openFile, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './score.reducer';

// tslint:disable-next-line:no-unused-variable

export interface IScoreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class ScoreDetail extends React.Component<IScoreDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {scoreEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.score.detail.title">Score</Translate> [<b>{scoreEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="total">
                <Translate contentKey="iCounselingApp.score.total">Total</Translate>
              </span>
            </dt>
            <dd>{scoreEntity.total}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="iCounselingApp.score.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {scoreEntity.image ? (
                <div>
                  <a onClick={openFile(scoreEntity.imageContentType, scoreEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {scoreEntity.imageContentType}, {byteSize(scoreEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="degree">
                <Translate contentKey="iCounselingApp.score.degree">Degree</Translate>
              </span>
            </dt>
            <dd>{scoreEntity.degree}</dd>
          </dl>
          <Button tag={Link} to="/entity/score" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/score/${scoreEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({score}: IRootState) => ({
  scoreEntity: score.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreDetail);
