import { Component, type ReactNode, type ErrorInfo } from "react";

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught render error:", error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Arre yaar!</p>
        <h1 className="mt-3 text-3xl font-extrabold">Kuch toot gaya.</h1>
        <p className="mt-3 text-ink-600">
          Page load nahi ho paaya. Refresh karke dekhein, ya ghar wapas jaayein.
        </p>
        {import.meta.env.DEV && (
          <pre className="mt-6 overflow-auto rounded bg-ink-50 p-3 text-left text-xs text-ink-700">
            {this.state.error.message}
          </pre>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Refresh
          </button>
          <a href="/" className="btn-outline" onClick={this.reset}>
            Home chalo
          </a>
        </div>
      </div>
    );
  }
}
