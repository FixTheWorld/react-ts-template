import { Spin } from "antd";
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
                                <Spin size="large" delay={1000} />
                                <span className="cm-white">Loading...</span>
                            </div>
                        }
                        {children}
                    </div>
                )
            }
        </Observer>
    )
}