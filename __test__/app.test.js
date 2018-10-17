import { shallow } from "enzyme";
import React from "react";
import { Button } from "react-native";
import App from "../App";
import CurrentSite from "../src/CurrentSite";
import PreviousSite from "../src/PreviousSite";

describe("App", () => {
  it("renders a current site component", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<CurrentSite />)).toEqual(true);
  });

  it("renders a previous site component", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<PreviousSite />)).toEqual(true);
  });

  describe("#Text", () => {
    it("should render the the text Welcome to React Native! in our first text tag", () => {
      const app = shallow(<App />);
      const text = app
        .find("#welcome")
        .dive()
        .text();
      expect(text).toEqual("Welcome to Injection Dependent");
    });
  });

  describe("Recommended Site", () => {
    it("should render the text of the suggested injection location", () => {
      const app = shallow(<App />);
      const text = app
        .find("#currentSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Left arm");
    });
  });

  describe("Confirm Button", () => {
    beforeEach(() => {
      window.alert = jest.fn()
    })
    it("should change the site after pressing Confirm", () => {
      const app = shallow(<App />)
      app.find("#confirm").simulate('press')
      const text = app
        .find("#currentSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Left leg");
    });
    it("shows the alert when confirmed", () => {
      const app = shallow(<App />);
      app.find("#confirm").simulate('press')
      expect(window.alert).toHaveBeenCalledWith('Confirmed')
      })
    })
    it("should change the site again after pressing Confirm a second time", () => {
      const app = shallow(<App />);
      app.find("#confirm").simulate('press')
      app.find("#confirm").simulate('press')
      const text = app
        .find("#currentSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Right arm");
    })
  })

  describe("Skip button", () => {
    beforeEach(() => {
      window.alert = jest.fn()
    })
    it('Shows the next site', () => {
      const app = shallow(<App />);
      app.find("#skip").simulate('press')
      const text = app
        .find("#currentSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Left leg");
    })
    it('Shows an alert when skipped', () => {
      const app = shallow(<App />);
      app.find("#skip").simulate('press')
      expect(window.alert).toHaveBeenCalledWith('Skipped')
    })
  });

  describe("History", () => {
    // it("should start with a blank history", () => {
    //   const app = shallow(<App />);
    //   const text = app
    //     .find("#previousSite")
    //     .dive()
    //     .find('#site')
    //     .dive()
    //     .text();
    //   expect(text).toEqual("");
    // });
    it("should know the previous injection site once confirmed", () => {
      const app = shallow(<App />);
      app.instance().handleConfirmation();
      const text = app
        .find("#previousSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Left arm");
    });
    it("should update previous injection site once confirmed again", () => {
      const app = shallow(<App />);
      app.instance().handleConfirmation();
      app.instance().handleConfirmation();
      const text = app
        .find("#previousSite")
        .dive()
        .find('#site')
        .dive()
        .text();
      expect(text).toEqual("Left leg");
    });
  });
