import './ErrorMessage.css';

const ErrorMessage = ({ message = 'An error occurred', onRetry }) => {
    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Oops!</h3>
            <p className="error-message">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-secondary">
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
