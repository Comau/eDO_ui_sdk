import { Location, LocationChangeEvent, LocationChangeListener, LocationStrategy, PopStateEvent } from '@angular/common';
import { ChangeDetectorRef, ClassProvider, Compiler, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, ErrorHandler, EventEmitter, ExistingProvider, FactoryProvider, InjectionToken, Injector, ModuleWithComponentFactories, ModuleWithProviders, NgModuleFactory, NgModuleInjector, NgModuleRef, NgModule, NgZone, OnInit, OpaqueToken, Provider, RenderDebugInfo, Renderer, TemplateRef, Type, TypeProvider, ValueProvider, ViewContainerRef, ViewRef } from '@angular/core';
import { Animation, AnimationOptions, App, BlockerDelegate, BlockerOptions, ClickBlock, Config, Content, DeepLinkConfig, DeepLinkMetadata, DeepLinker, DocumentDirection, DomCallback, DomController, DomDebouncer, EventListenerOptions, Footer, GestureController, GestureDelegate, GestureOptions, Header, Ion, IonicApp, IonicPageMetadata, Keyboard, LoadedModule, Menu, MenuController, MenuType, ModuleLoader, NavController, NavControllerBase, NavLink, NavOptions, NavParams, NavResult, NavSegment, Navbar, NgModuleLoader, OverlayPortal, Page, PanGesture, PanGestureConfig, Platform, PlatformConfig, PlatformVersion, PlayOptions, Side, SlideData, SlideEdgeGesture, SlideGesture, SwipeBackGesture, Tab, Tabs, Toast, ToastController, ToastOptions, Transition, TransitionController, TransitionInstruction, UrlSerializer, ViewController } from 'ionic-angular';
import { Action, AnonymousSubscription, CompletionObserver, DispatchArg, ErrorObservable, ErrorObserver, IScheduler, ISubscription, IfObservable, NextObserver, Observable, Observer, Operator, PartialObserver, Scheduler, Subject, Subscribable, SubscribableOrPromise, Subscriber, Subscription, TeardownLogic } from 'rxjs';

declare enum CurrentState {
	DISCONNECTED = -2,
	UNKNOWN = -1,
	INIT = 0,
	NOT_CALIBRATED = 1,
	CALIBRATED = 2,
	MOVE = 3,
	JOG = 4,
	MACHINE_ERROR = 5,
	BREAKED = 6,
	INIT_DISCOVER = 254,
	COMMAND = 255,
}
export declare type MachineState = {
	current_state: CurrentState;
	opcode: number;
};
export declare type MovementCommand = {
	movement_type: MoveType;
	size: number;
	data: Array<number>;
	movement_attributes: number[];
	ovr: number;
};
export declare type SystemCommand = {
	command: SystemCommandType;
	data: string;
};
export declare type NodeSwVersion = {
	id: number;
	version: string;
};
export declare type NodeSwVersionArray = {
	nodes: NodeSwVersion[];
};
/**
 * Movement type supported
 */
export declare enum MoveType {
	MOVE_TRJNT_J = 0,
	MOVE_TRJNT_C = 1,
	MOVE_CARLIN_J = 10,
	MOVE_CARLIN_C = 11,
	MOVE_CARCIR_J = 20,
	MOVE_CARCIR_C = 21,
	MOVE_PAUSE = 6,
	MOVE_RESUME = 7,
	MOVE_CANCEL = 8,
}
/**
 * System commands & responses type
 */
export declare enum SystemCommandType {
	SET_TIME = 0,
	SET_TIME_RESPONSE = 0,
	SET_LAN_IP = 1,
	SET_LAN_IP_RESPONSE = 1,
	GET_LAN_IP = 2,
	GET_LAN_IP_RESPONSE = 2,
	SET_WIFI_SSID = 3,
	SET_WIFI_SSID_RESPONSE = 3,
	GET_WIFI_SSID = 4,
	GET_WIFI_SSID_RESPONSE = 4,
}
/**
 * Message feedback codes for move commands
 */
export declare enum MessageFeedback {
	COMMAND_RECEIVED = 0,
	SEND_NEXT_IF_AVAILABLE = 1,
	COMMAND_EXECUTED = 2,
	ERROR = -1,
}
/**
 * Service handling commands queuing and comunication with e.DO using ROSLibJS.
 */
export declare class RosService {
	private toastCtrl;
	readonly machineStateChangeEvent: Subject<MachineState>;
	running: boolean;
	paused: boolean;
	machineState: MachineState;
	joints: Array<number>;
	readonly jointsChangeEvent: Subject<number[]>;
	jointsLastUpdate: Date;
	cartesianPosition: any;
	readonly cartesianPositionChangeEvent: Subject<any>;
	cartesianPositionLastUpdate: Date;
	readonly setJointIdStatusEvent: Subject<SystemCommand>;
	readonly isReady: boolean;
	private ros;
	private serviceSwVersion;
	private serviceSystemCommand;
	private topicJntState;
	private topicCartesianPose;
	private topicMoveAck;
	private topicMachineState;
	private topicSetJointIdStatus;
	private topicMoveCommand;
	private topicJogCommand;
	private topicJointCalibrationCommand;
	private topicJointInitCommand;
	private topicJointResetCommand;
	private topicSetJointId;
	private topicControlSwitch;
	private lastRosUrl;
	private lastRosPort;
	private pendingQueue;
	private waitingReceiveQueue;
	private waitingExecutedQueue;
	private connectTimeoutTimer;
	constructor(toastCtrl: ToastController);
	connectTo(url: string, port: string): void;
	connect(): void;
	disconnect(): void;
	private initCommands();
	readonly pendingQueueLength: number;
	readonly waitingReceiveQueueLength: number;
	readonly waitingExecutedQueueLength: number;
	sendCalibrateCommand(joint: number): Promise<void>;
	sendResetCommand(): Promise<void>;
	sendInitCommand(joint: number): Promise<void>;
	sendJogCommand(moveType: MoveType, joints: Array<number>): Promise<void>;
	private sendMoveCommand(command);
	sendSetJointId(joint: number): void;
	sendSystemCommand(command: SystemCommand): Promise<string>;
	pushMoveCommand(command: MovementCommand, data: any): Promise<any>;
	pauseQueue(): Promise<any>;
	resumeQueue(): Promise<any>;
	clearQueue(): Promise<number>;
	getSwVersion(): Promise<NodeSwVersionArray>;
	sendControlSwitch(value: boolean): Promise<void>;
	convertFlagsToMovementAttribute(delay: number, flags: string): Array<number>;
}
@NgModule()
export declare class EDOModule {
	static forRoot(): ModuleWithProviders;
}
export declare function EDOShowInMenu(label: string, icon: string ): ClassDecorator;

export as namespace edosdk;
