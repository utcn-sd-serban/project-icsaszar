import * as React from "react";
import * as diff from "jest-diff";
import {TeacherReport} from "../../../model/objects/report/TeacherReport";
import {AppState} from "../../../model/state/store";
import {connect} from "react-redux";

interface Props {
    report: TeacherReport
}

export const TeacherReportView: React.FC<Props> =
    ({report}) => (
        <div className="container">
            <h1> Report summary </h1>
            <h3> {report.header} </h3>
            {
                report.rows.map(row =>
                    (<div className="row border border-primary rounded" key={row.category.id}>
                        <div className="col">
                            {row.category.name}
                        </div>
                        <div className="col">
                            {
                                row.subRows.map(subRow =>
                                    (<div className="row border border-info rounded" key={subRow.round.id}>
                                        <div className="col">
                                            {subRow.round.name}
                                        </div>
                                        <div className="col">
                                            {subRow.count}
                                        </div>
                                    </div>)
                                )
                            }
                        </div>
                    </div>)
                )
            }
        </div>
    );