import {shallow} from 'enzyme';
import React from 'react';
import moment from 'moment'
import PreviousSite from '../src/PreviousSite';

describe('PreviousSite', () => {
  it('renders text of previous site location and time', () => {
    const time = moment()
    const calTime = time.calendar()
    const app = shallow(<PreviousSite site={"Left arm"} time={time}/>);
    const text = app
      .find("#site")
      .dive()
      .text();
    expect(text).toEqual("Previous: Left arm, " + calTime);
  })
});
