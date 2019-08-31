import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/counseling-case">
      <Translate contentKey="global.menu.entities.counselingCase" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/counselor">
      <Translate contentKey="global.menu.entities.counselor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/reseume">
      <Translate contentKey="global.menu.entities.reseume" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/education">
      <Translate contentKey="global.menu.entities.education" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/planning">
      <Translate contentKey="global.menu.entities.planning" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/task">
      <Translate contentKey="global.menu.entities.task" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/reminder">
      <Translate contentKey="global.menu.entities.reminder" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/time-reserved">
      <Translate contentKey="global.menu.entities.timeReserved" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/visitor">
      <Translate contentKey="global.menu.entities.visitor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/job">
      <Translate contentKey="global.menu.entities.job" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/job-history">
      <Translate contentKey="global.menu.entities.jobHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/schedule">
      <Translate contentKey="global.menu.entities.schedule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/document">
      <Translate contentKey="global.menu.entities.document" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/post">
      <Translate contentKey="global.menu.entities.post" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/score">
      <Translate contentKey="global.menu.entities.score" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/rate">
      <Translate contentKey="global.menu.entities.rate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/comment">
      <Translate contentKey="global.menu.entities.comment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/library">
      <Translate contentKey="global.menu.entities.library" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/transaction">
      <Translate contentKey="global.menu.entities.transaction" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
