import { createSelector } from 'reselect';

export const getParticipants = state => state.getIn(['Domains', 'Participants']);