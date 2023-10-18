import React from 'react'

const TableDinamic = (params) => {
  return (
    <table className="table mt-5">
        <thead>
            <tr>
                <th scope="col">CARNET</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">CURSO</th>
                <th scope="col">NOTA</th>
                <th scope="col">SEMESTRE</th>
                <th scope="col">YEAR</th>
            </tr>
        </thead>
        <tbody>
            { 
                params.students.map( (student, j) => (
                    student != null &&
                    <tr key={"stud"+j}>
                        <th scope="row">{student.carnet}</th>
                        <td>{student.nombre}</td>
                        <td>{student.curso}</td>
                        <td>{student.nota}</td>
                        <td>{student.semestre}</td>
                        <td>{student.year}</td>
                    </tr>
                ))                                         
            }
        </tbody>
    </table>
  )
}

export default TableDinamic