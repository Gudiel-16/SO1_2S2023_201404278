import React from 'react'

const TableData = (params) => {
  return (
    <table className="table mt-5">
        <thead>
            <tr>
                <th scope="col">CARNET</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">CURSO</th>
                <th scope="col">NOMBRE CURSO</th>
                <th scope="col">NOTA</th>
                <th scope="col">SEMESTRE</th>
                <th scope="col">YEAR</th>
            </tr>
        </thead>
        <tbody>
            { 
                params.students.map( (student, j) => (
                    <tr key={"stud"+j}>
                        <th scope="row">{student.carnet}</th>
                        <td>{student.nombre_alumno}</td>
                        <td>{student.nombre_curso_abreviado}</td>
                        <td>{student.nombre_curso}</td>
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

export default TableData