import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './library.reducer';
// tslint:disable-next-line:no-unused-variable
import {APP_LOCAL_DATE_FORMAT} from 'app/config/constants';

export interface ILibraryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class LibraryDetail extends React.Component<ILibraryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const {libraryEntity} = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iCounselingApp.library.detail.title">Library</Translate> [<b>{libraryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="iCounselingApp.library.name">Name</Translate>
              </span>
            </dt>
            <dd>{libraryEntity.name}</dd>
            <dt>
              <span id="creationTime">
                <Translate contentKey="iCounselingApp.library.creationTime">Creation Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={libraryEntity.creationTime} type="date" format={APP_LOCAL_DATE_FORMAT}/>
            </dd>
            <dt>
              <Translate contentKey="iCounselingApp.library.visitor">Visitor</Translate>
            </dt>
            <dd>{libraryEntity.visitorId ? libraryEntity.visitorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/library" replace color="info">
            <FontAwesomeIcon icon="arrow-left"/>{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/library/${libraryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({library}: IRootState) => ({
  libraryEntity: library.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryDetail);
