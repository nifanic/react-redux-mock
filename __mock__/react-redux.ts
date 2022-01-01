import { ReactElement } from "react";
import { MapStateToPropsParam } from "react-redux";

import {
  IAssetDrawerActions,
  IAssetDrawerOwnProps,
} from "@A-DealerUI/foresight/dashboard";
import { AthenaState, IAssetDetails } from "@A-DealerUI/foresight/state";

const mockDispatch = jest.fn<IAssetDrawerActions, [IAssetDrawerActions]>(
  (action) => action
);

type MockedMapDispatchToPropsParam<TDispatchProps, TOwnProps> = (
  dispatch?: jest.Mock<TDispatchProps, [TDispatchProps]>,
  ownProps?: TOwnProps
) => TDispatchProps;

export type MockedConnectReturn<TStateProps, TDispatchProps, TOwnProps, State> =
  {
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>;
    mapDispatchToProps: MockedMapDispatchToPropsParam<
      TDispatchProps,
      TOwnProps
    >;
    WrappedComponent: ReactElement;
    mockDispatch: jest.Mock<TDispatchProps, [TDispatchProps]>;
  };

type MockedConnect<TStateProps, TDispatchProps, TOwnProps, State> = (
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MockedMapDispatchToPropsParam<TDispatchProps, TOwnProps>
) => (
  WrappedComponent
) => MockedConnectReturn<TStateProps, TDispatchProps, TOwnProps, State>;

module.exports = {
  connect: (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    return {
      ...jest.requireActual("react-redux"),
      mapStateToProps,
      mapDispatchToProps: (dispatch = mockDispatch, ownProps) =>
        mapDispatchToProps(dispatch, ownProps),
      WrappedComponent,
      mockDispatch,
    };
  },
  Provider: ({ children }) => children,
} as {
  connect: MockedConnect<
    Partial<IAssetDetails>,
    IAssetDrawerActions,
    IAssetDrawerOwnProps,
    AthenaState
  >;
  Provider: ({ children }) => unknown;
};
