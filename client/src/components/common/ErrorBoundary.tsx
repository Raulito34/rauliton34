import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props { children: ReactNode }
interface State { hasError: boolean }

/** Catches render-time errors in the subtree and shows a graceful fallback. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Render error caught by ErrorBoundary:', error);
  }

  handleReset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-[480px]">
            <p className="text-spec-label text-[var(--ink-mist)] mb-4">Error</p>
            <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light mb-4">
              문제가 발생했습니다.
            </h1>
            <p className="text-[15px] text-[var(--ink-soft)] mb-8 leading-relaxed">
              페이지를 표시하는 중 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="btn-primary" onClick={this.handleReset}>
                <span>홈으로</span>
              </Link>
              <button onClick={() => window.location.reload()} className="btn-outline">
                새로고침
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
