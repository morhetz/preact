import { createElement, render, Component, Fragment } from 'preact';
// import renderToString from 'preact-render-to-string';
import './style.scss';
import { Router, Link } from 'preact-router';
import Pythagoras from './pythagoras';
import Spiral from './spiral';
import Reorder from './reorder';
import Todo from './todo';
import Fragments from './fragments';
import Context from './context';
import installLogger from './logger';
import ProfilerDemo from './profiler';
import KeyBug from './key_bug';
import StateOrderBug from './stateOrderBug';
import PeopleBrowser from './people';
import StyledComp from './styled-components';
import { initDevTools } from 'preact/debug/src/devtools';
import { initDebug } from 'preact/debug/src/debug';
import { useState, useEffect } from 'preact/hooks';
import DevtoolsDemo from './devtools';
import SuspenseDemo from './suspense';
import Redux from './redux';

let isBenchmark = /(\/spiral|\/pythagoras|[#&]bench)/g.test(window.location.href);
if (!isBenchmark) {
	// eslint-disable-next-line no-console
	console.log('Enabling devtools and debug');
	initDevTools();
	initDebug();
}

// mobx-state-tree fix
window.setImmediate = setTimeout;

class Home extends Component {
	render() {
		return (
			<div>
				<h1>Hello</h1>
			</div>
		);
	}
}

class DevtoolsWarning extends Component {
	onClick = () => {
		window.location.reload();
	}

	render() {
		return (
			<button onClick={this.onClick}>Start Benchmark (disables devtools)</button>
		);
	}
}

class AppF extends Component {
	render({ url }) {
		return (
			<div class="app">
				<header>
					<nav>
						<Link href="/" activeClassName="active">Home</Link>
						<Link href="/reorder" activeClassName="active">Reorder</Link>
						<Link href="/spiral" activeClassName="active">Spiral</Link>
						<Link href="/pythagoras" activeClassName="active">Pythagoras</Link>
						<Link href="/todo" activeClassName="active">ToDo</Link>
						<Link href="/fragments" activeClassName="active">Fragments</Link>
						<Link href="/key_bug" activeClassName="active">Key Bug</Link>
						<Link href="/profiler" activeClassName="active">Profiler</Link>
						<Link href="/context" activeClassName="active">Context</Link>
						<Link href="/devtools" activeClassName="active">Devtools</Link>
						<Link href="/empty-fragment" activeClassName="active">Empty Fragment</Link>
						<Link href="/people" activeClassName="active">People Browser</Link>
						<Link href="/state-order" activeClassName="active">State Order</Link>
						<Link href="/styled-components" activeClassName="active">Styled Components</Link>
						<Link href="/redux" activeClassName="active">Redux</Link>
						<Link href="/suspense" activeClassName="active">Suspense / lazy</Link>
					</nav>
				</header>
				<main>
					<Router url={url}>
						<Home path="/" />
						<StateOrderBug path="/state-order" />
						<Reorder path="/reorder" />
						<div path="/spiral">
							{!isBenchmark
								? <DevtoolsWarning />
								: <Spiral />
							}
						</div>
						<div path="/pythagoras">
							{!isBenchmark
								? <DevtoolsWarning />
								: <Pythagoras />
							}
						</div>
						<Todo path="/todo" />
						<Fragments path="/fragments" />
						<ProfilerDemo path="/profiler" />
						<KeyBug path="/key_bug" />
						<Context path="/context" />
						<DevtoolsDemo path="/devtools" />
						<SuspenseDemo path="/suspense" />
						<EmptyFragment path="/empty-fragment" />
						<PeopleBrowser path="/people/:user?" />
						<StyledComp path="/styled-components" />
						<Redux path="/redux" />
					</Router>
				</main>
			</div>
		);
	}
}

// function Foo() {
// 	return <Bob />;
// }

// function Bar() {
// 	return <Bob />
// }

// let i = 0;
// function Bob() {
// 	return <div>bob {++i}</div>
// }

function EmptyFragment() {
	return <Fragment />;
}

// document.body.innerHTML = renderToString(<App url={location.href.match(/[#&]ssr/) ? undefined : '/'} />);
// document.body.firstChild.setAttribute('is-ssr', 'true');

installLogger(
	String(localStorage.LOG)==='true' || location.href.match(/logger/),
	String(localStorage.CONSOLE)==='true' || location.href.match(/console/)
);

// function App3() {
// 	return <h1>Hello World</h1>;
// }

// function FakeRouter(props) {
// 	return props.active ? props.children[0] : props.children[1];
// }

// function App2() {
// 	let [v, update] = useState(true);
// 	useEffect(() => setTimeout(() => {
// 		console.log("update")
// 		update(false)}, 4000), []);

//   return (
// 			<FakeRouter active={v}>
// 				<Foo/>
// 				<Bar />
// 			</FakeRouter>
//   );
// }


function Foo() {
	return 'foo';
}

function Baz() {
	return <div>baz</div>;
}

function Bar() {
	return <Baz />;
}

function App() {
	let [v, setter] = useState(true);
	let update = () => setter(!v);
	return (
		<div>
			<button onClick={update}>toggle</button>
			{v ? <Foo /> : <Bar />}
		</div>
	);
}
render(<App />, document.body);
