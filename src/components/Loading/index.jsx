import { Spin, Alert } from "antd";
import { Observer } from "mobx-react";
import mobx from "../../store/mobx"
import './index.scss';
export default function ({ children }) {
    return (
        <Observer>
            {
                () => (
                    <div className="cm-flex cm-flex-v">
                        {mobx.loading &&
                            <div className="cp-loading cm-flex-v cm-center">
                                <Spin size="large" />
                                <span className="cm-white">Loading...</span>
                            </div>
                        }
                        {mobx.error &&
                            <Alert
                                message="Error"
                                description={mobx.errorMessage}
                                type="error"
                                showIcon
                                closable
                                onClose={()=>mobx.hideError()}
                            />
                        }
                        {children}
                    </div>
                )
            }
        </Observer>
    )
}