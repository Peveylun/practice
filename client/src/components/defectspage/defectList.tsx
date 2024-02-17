import {Table} from "react-bootstrap";
import React from "react";
import IDefect from "../../interfaces/defect.ts";

interface DefectListProps {
    defects: IDefect[];
}

const DefectList: React.FC<DefectListProps> = (filteredDefects: DefectListProps) => {
    return (
        <div>
            <Table striped borderless size="sm">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Номер кімнати</th>
                    <th>Опис</th>
                    <th>Статус</th>
                    <th>Створено</th>
                    <th>Закрито</th>
                    <th>Опублікував</th>
                </tr>
                </thead>
                <tbody>
                {filteredDefects.defects.map((defect: IDefect, index) => (
                    <tr className="listItem" key={defect._id}>
                        <td>{index + 1}</td>
                        <td>{defect.roomNumber}</td>
                        <td>{defect.description}</td>
                        <td>{defect.status ? 'Виконано' : 'Не виконано'}</td>
                        <td>{defect.createdAt.toString()}</td>
                        <td>{defect.closedAt?.toString()}</td>
                        <td>{`${defect.reportedBy.name} ${defect.reportedBy.surname || ''}`}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default DefectList;