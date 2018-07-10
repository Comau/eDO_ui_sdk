import { Location, LocationChangeEvent, LocationChangeListener, LocationStrategy, PopStateEvent } from '@angular/common';
import { ChangeDetectorRef, ClassProvider, Compiler, ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, ErrorHandler, EventEmitter, ExistingProvider, FactoryProvider, InjectionToken, Injector, ModuleWithComponentFactories, ModuleWithProviders, NgModuleFactory, NgModuleInjector, NgModuleRef, NgModule, NgZone, OnInit, OpaqueToken, Provider, RenderDebugInfo, Renderer, TemplateRef, Type, TypeProvider, ValueProvider, ViewContainerRef, ViewRef } from '@angular/core';
import { Storage, StorageConfig } from '@ionic/storage';
import { Animation, AnimationOptions, App, BlockerDelegate, BlockerOptions, ClickBlock, Config, Content, DeepLinkConfig, DeepLinkMetadata, DeepLinker, DocumentDirection, DomCallback, DomController, DomDebouncer, EventListenerOptions, Footer, GestureController, GestureDelegate, GestureOptions, Header, Ion, IonicApp, IonicPageMetadata, Keyboard, LoadedModule, Menu, MenuController, MenuType, ModuleLoader, NavController, NavControllerBase, NavLink, NavOptions, NavParams, NavResult, NavSegment, Navbar, NgModuleLoader, OverlayPortal, Page, PanGesture, PanGestureConfig, Platform, PlatformConfig, PlatformVersion, PlayOptions, Side, SlideData, SlideEdgeGesture, SlideGesture, SwipeBackGesture, Tab, Tabs, Toast, ToastController, ToastOptions, Transition, TransitionController, TransitionInstruction, UrlSerializer, ViewController } from 'ionic-angular';
import { Action, AnonymousSubscription, CompletionObserver, DispatchArg, ErrorObservable, ErrorObserver, IScheduler, ISubscription, IfObservable, NextObserver, Observable, Observer, Operator, PartialObserver, Scheduler, Subject, Subscribable, SubscribableOrPromise, Subscriber, Subscription, TeardownLogic } from 'rxjs';

/**
 * Tool type definition
 */
export declare type Tool = {
	name: string;
	id: string;
	frame: Frame;
};
declare class ToolsService {
	storage: Storage;
	constructor(storage: Storage);
	/**
	 * Load (async) a Tool saved in the underlying storage
	 */
	loadTool(id: string): Promise<Tool>;
	/**
	 * Load (async) all Tool saved in the underlying storage
	 */
	load(): Promise<Tool[]>;
	/**
	 * Save (async) a Tool to the underlying storage
	 */
	save(tool: Tool): Promise<Tool>;
	/**
	 * Delete (async) a Tool from the underlying storage
	 */
	delete(tool: Tool): Promise<any>;
	/**
	 * Sort Tools
	 */
	reorder(from: any, to: any): Promise<any>;
}
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
export declare type CartesianPose = {
	x: number;
	y: number;
	z: number;
	a: number;
	e: number;
	r: number;
	config_flags: string;
};
export declare type Point = {
	data_type: DestinationType;
	cartesian_data: CartesianPose;
	joints_mask: number;
	joints_data: number[];
};
export declare type Frame = {
	x: number;
	y: number;
	z: number;
	a: number;
	e: number;
	r: number;
};
export declare type MachineState = {
	current_state: CurrentState;
	opcode: number;
};
export declare type MovementCommand = {
	move_command: MoveCommand;
	move_type: MoveType;
	ovr: number;
	delay: number;
	cartesian_linear_speed: number;
	target: Point;
	via: Point;
	tool: Frame | string;
	frame: Frame;
	remote_tool: number;
};
export declare type JointControl = {
	position: number;
	velocity: number;
	current: number;
	ff_velocity: number;
	ff_current: number;
};
export declare type JointControlArray = {
	size: number;
	joints: JointControl[];
};
export declare type JointState = {
	position: number;
	velocity: number;
	current: number;
	commandFlag: number;
};
export declare type JointStateArray = {
	joints_mask: number;
	joints: JointState[];
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
	JOINT = 74,
	LINEAR = 76,
	CIRCULAR = 67,
}
export declare enum MoveCommand {
	EXE_JOGMOVE = 74,
	EXE_MOVE = 77,
	PAUSE = 80,
	RESUME = 82,
	CANCEL_MOVE = 67,
}
export declare enum DestinationType {
	JOINT = 74,
	POSITION = 80,
	XTNDPOS = 88,
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
	private toolsService;
	readonly machineStateChangeEvent: Subject<MachineState>;
	running: boolean;
	paused: boolean;
	machineState: MachineState;
	joints: JointStateArray;
	readonly jointsChangeEvent: Subject<JointStateArray>;
	jointsLastUpdate: Date;
	jointsTarget: JointControlArray;
	cartesianPosition: CartesianPose;
	readonly cartesianPositionChangeEvent: Subject<any>;
	cartesianPositionLastUpdate: Date;
	readonly setJointIdStatusEvent: Subject<SystemCommand>;
	readonly isReady: boolean;
	private ros;
	private serviceSwVersion;
	private serviceSystemCommand;
	private topicJntState;
	private topicJntTargetState;
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
	constructor(toastCtrl: ToastController, toolsService: ToolsService);
	connectTo(url: string, port: string): void;
	connect(): void;
	disconnect(): void;
	private initCommands();
	readonly pendingQueueLength: number;
	readonly waitingReceiveQueueLength: number;
	readonly waitingExecutedQueueLength: number;
	sendCalibrateCommand(joint: number): Promise<void>;
	sendResetCommand(): Promise<void>;
	sendInitCommand(joints_mask: number): Promise<void>;
	sendJogCommand(moveType: MoveType, target: Point, tool?: string): Promise<void>;
	private checkMoveCommand(command);
	private sendMoveCommand(command);
	sendSetJointId(joint: number): void;
	sendSystemCommand(command: SystemCommand): Promise<string>;
	pushMoveCommand(command: MovementCommand, data: any): Promise<any>;
	pauseQueue(): Promise<any>;
	resumeQueue(): Promise<any>;
	clearQueue(): Promise<number>;
	getSwVersion(): Promise<NodeSwVersionArray>;
	sendControlSwitch(value: boolean): Promise<void>;
}
@NgModule({declarations: [
    HoldDirective
  ],
  imports: [
  ],
  exports: [
    HoldDirective
  ]})
export declare class EDOModule {
	static forRoot(): ModuleWithProviders;
}
export declare function EDOShowInMenu(label: string, icon: string): ClassDecorator;
/**
 * Directive that fire an event every 30 ms while holding a button
 */
@Directive({ selector: '[hold]', exportAs:'holdRef'  })
export declare class HoldDirective {
	private el;
	holding: EventEmitter<number>;
	holdingStart: EventEmitter<number>;
	holdingCancel: EventEmitter<number>;
	private value;
	private lastTimeStamp;
	private onAnimationFrame;
	constructor(el: ElementRef);
	onHoldStart(event: Event): void;
	onHoldEnd(event: Event): void;
}

export as namespace edosdk;
