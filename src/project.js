const Project = (projectName) => {
    const name = projectName;

    const setName = (newName) => name = newName;
    const getName = () => name;


    return {setName, getName};
}

export default Project;