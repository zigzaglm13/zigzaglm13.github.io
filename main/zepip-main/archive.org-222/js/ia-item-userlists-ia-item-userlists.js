import 'https://esm.archive.org/@internetarchive/modal-manager@^0.3.4';
import 'https://esm.archive.org/@internetarchive/ia-item-user-lists@1.4.1';

import log from '../util/log.js';

/* global  archive_analytics */

document.addEventListener('DOMContentLoaded', () => {
  const userlistElement = document.querySelector('ia-item-user-lists');
  if (!userlistElement) {
    return;
  }

  // set analytics
  if (window.archive_analytics) {
    const currentItemMediaType = archive_analytics.mediaType ?? 'unknown mediatype';
    const category = 'DetailsPageUserLists';
    userlistElement.addEventListener('userItemListDataReceived', (event) => {
      const totalLists = event.detail?.listCount ?? 0;
      log('UserLists - onload, we send total lists', event.detail);
      archive_analytics.send_event(category, 'onload', totalLists);
    });
    userlistElement.addEventListener('memberAdded', (event) => {
      log('UserLists - memberAdded, we send mediatype', currentItemMediaType);
      archive_analytics.send_event(category, 'memberAdded', currentItemMediaType);
    });
    userlistElement.addEventListener('memberRemoved', (event) => {
      log('UserLists - memberRemoved, we send mediatype', currentItemMediaType);
      archive_analytics.send_event(category, 'memberRemoved', currentItemMediaType);
    });
    userlistElement.addEventListener('listCreated', () => {
      log('UserLists - listCreated, we send mediatype', currentItemMediaType);
      archive_analytics.send_event(category, 'listCreated', currentItemMediaType);
    });
  }

  // Set up lists feature callout
  const CALLOUT_DISMISSAL_KEY = 'UserLists-itemBtnCalloutDismissed';
  const userlistCallout = document.querySelector('#item-user-lists > .callout');

  function removeUserListCallout() {
    window.localStorage?.setItem(CALLOUT_DISMISSAL_KEY, true);
    userlistCallout?.remove();
    userlistElement?.setAttribute('aria-label', 'Add to list');
    userlistElement?.removeEventListener('click', removeUserListCallout);
  }

  function applyCorrectCalloutState() {
    const isCalloutDismissed = !!window.localStorage?.getItem(CALLOUT_DISMISSAL_KEY);
    if (!isCalloutDismissed) {
      userlistElement?.setAttribute('aria-label', 'New feature: Add to list');
      userlistCallout?.toggleAttribute('hidden', false);

      userlistElement?.addEventListener('click', removeUserListCallout);
      userlistCallout?.addEventListener('click', removeUserListCallout);
    }
  }

  applyCorrectCalloutState();
});
