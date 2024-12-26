import React, { useEffect, useState } from 'react';
import './App.css';
import FormAddOrEdit from './components/FormAddOrEdit';
import ButtonAdd from './components/ButtonAdd';
import ButtonSearch from './components/ButtonSearch';
import ButtonSort from './components/ButtonSort';
import TableTask from './components/TableTask';
import ButtonGenerate from './components/ButtonGenerate';

// 1. HIỂN THỊ TABLE
const initTasks = [
  {
    id: 0,
    name: 'hoc HTML',
    status: true
  },
  {
    id: 1,
    name: 'hoc CSS',
    status: false
  },
  {
    id: 2,
    name: 'hoc JS',
    status: true
  },
];
const initMakeCurrentId = 3;
var makeCurrentId = initMakeCurrentId;
const initTaskEdit = {
  id: null,
  name: '',
  status: true
}


function App() {
  // 
  const [displayForm, setDisplayForm] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskEdit, setTaskEdit] = useState(initTaskEdit);

  // 1. HIỂN THỊ TABLE: VÀO TRANG - ĐỌC DATA LÊN
  useEffect(() => {
    let dataLocal = readDataToLocalStorage();
    let tasksLocal = [];
    if (dataLocal && dataLocal.tasks) {
      tasksLocal = [...dataLocal.tasks];
    }

    // mặc định - vào trang - thì SORT: theo NAME + TĂNG DẦN
        tasksLocal = tasksLocal.sort((a, b) => {
          if (a.name > b.name) { return 1; }
          if (a.name < b.name) { return -1; }
        })

    setTasks(tasksLocal);
    makeCurrentId = dataLocal.makeCurrentId;
  }, [])


  // LOCALSTORAGE
  const writeDataToLocalStorage = (tasks, makeCurrentId) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('makeCurrentId', JSON.stringify(makeCurrentId));
  }
  const readDataToLocalStorage = () => {
    let tasksLocal = JSON.parse(localStorage.getItem('tasks'));
    let makeCurrentIdLocal = JSON.parse(localStorage.getItem('makeCurrentId'));

    return {
      tasks: tasksLocal,
      makeCurrentId: makeCurrentIdLocal,
    }
  }


  // 2. GENERATE-DATA
  const generateData = () => {
    setTasks(initTasks);
    makeCurrentId = initMakeCurrentId;

    writeDataToLocalStorage(initTasks, initMakeCurrentId);
  }

  // 3.ĐÓNG MỞ - TOGGLE FORM:
  const openFormAddEdit = () => {
    setDisplayForm(true);
  }
  const closeFormAddEdit = () => {
    setDisplayForm(false);
  }
  const toggleFormAddEdit = () => {
    // đang SỬA - click vào THÊM: vẫn mở form
    if (taskEdit.id !== null) {
      setDisplayForm(true);
      setTaskEdit(initTaskEdit);
    } else {
      setDisplayForm(!displayForm);
    }

  }

  // 4.ADD NEW + UPDATE
  const onAddOrEditTask = (task) => {
    console.log('task', task);
    let newTasks = [...tasks];
    if (task.id === null) {
      // TH1: ADD
      let taskAdd = { ...task, id: makeCurrentId };
      makeCurrentId++;

      newTasks.push(taskAdd);
    } else {
      // TH2: UPDATE
      let indexEdit = findIndexTaskById(task.id);
      if (indexEdit !== -1) {
        newTasks[indexEdit] = task;
        // newTasks[indexEdit] = {...task};
      }
    }

    setTasks(newTasks);
    writeDataToLocalStorage(newTasks, makeCurrentId);
  }

  // FIND INDEX - BY ID
  const findIndexTaskById = (id) => {
    let result = -1;
    tasks.forEach((item, index) => {
      if (item.id === id) {
        result = index;
      }
    });
    return result;
  }

  // 5. UPDATE STATUS: tìm + gán
  const onUpdateStatusTask = (id) => {
    // console.log(id);
    let indexUpdate = findIndexTaskById(id);
    console.log(indexUpdate);

    if (indexUpdate !== -1) {
      let newTasks = [...tasks];
      newTasks[indexUpdate].status = !newTasks[indexUpdate].status;
      setTasks(newTasks);
      writeDataToLocalStorage(newTasks, makeCurrentId);
    }
  }

  // 6. DELETE TASK : splice
  const onDeleteTask = (id) => {
    // console.log(id);
    let indexDelete = findIndexTaskById(id);
    console.log(indexDelete);

    if (indexDelete !== -1) {
      let newTasks = [...tasks];
      newTasks.splice(indexDelete, 1);
      setTasks(newTasks);
      writeDataToLocalStorage(newTasks, makeCurrentId);
    }
  }

  // 7. UPDATE TASK: tìm + gán
  const onUpdateTask = (id) => {
    // console.log(id);
    let indexUpdate = findIndexTaskById(id);
    console.log(indexUpdate);

    if (indexUpdate !== -1) {
      setTaskEdit(tasks[indexUpdate]);
    }
  }

  // 8. FILTER: trả về item có CB return TRUE
  const onFilterTasks = (fieldFilter) => {
    // console.log(fieldFilter);
    let { name, status } = fieldFilter;

    // CY - LẤY DỮ LIỆU FULL - TỪ LOCALSTORAGE
    let dataLocal = readDataToLocalStorage();
    let taskFilters = [...dataLocal.tasks];

    // name
    taskFilters = taskFilters.filter(item => {
      return (item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    })

    // status
    if (status === 0) {
      taskFilters = taskFilters.filter(item => {
        return (item.status === false);
      })
    }
    if (status === 1) {
      taskFilters = taskFilters.filter(item => {
        return (item.status === true);
      })
    }
    // SET STATE - RENDER LẠI GIAO DIỆN
    setTasks(taskFilters);
  }

  // 9. ONSEARCH = filter - trả về item có CB return TRUE
  const onSearch = (searchKey) => {
    console.log(searchKey);
    // CY - LẤY DỮ LIỆU FULL - TỪ LOCALSTORAGE
    let dataLocal = readDataToLocalStorage();
    let taskFilters = [...dataLocal.tasks];

    // name
    taskFilters = taskFilters.filter(item => {
      return (item.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
    })
    // SET STATE - RENDER LẠI GIAO DIỆN
    setTasks(taskFilters);
  }

  // 10. SORT: sort - {TĂNG - khi CALLBACK return 1} - {GIẢM - khi CALLBACK return -1}
  const onSort = (by, type) => {
    // console.log('by', by);
    // console.log('type', type);
    let taskSorts = [...tasks];

    // name
    if (by === 'name') {
      taskSorts = taskSorts.sort((a, b) => {
        if (a.name > b.name) { return type; }
        if (a.name < b.name) { return (-1 * type); }
      })
    }
    // status
    if (by === 'status') {
      taskSorts = taskSorts.sort((a, b) => {
        if (a.status < b.status) { return type; }
        if (a.status > b.status) { return (-1 * type); }
      })
    }

    // SET STATE - RENDER LẠI GIAO DIỆN
    setTasks(taskSorts);
  }


  // RENDER
  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row mt-15">
        {displayForm
          ?
          <FormAddOrEdit
            onAddOrEditTask={onAddOrEditTask}
            closeFormAddEdit={closeFormAddEdit}
            taskEdit={taskEdit}
          />
          :
          <></>
        }
        <div className={displayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >

          <ButtonAdd toggleFormAddEdit={toggleFormAddEdit} />
          <ButtonGenerate generateData={generateData} />

          <div className="row mt-15">
            <ButtonSearch onSearch={onSearch} />
            <ButtonSort onSort={onSort} />
          </div>
          <div className="row mt-15">
            <TableTask
              tasks={tasks}
              onUpdateStatusTask={onUpdateStatusTask}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onFilterTasks={onFilterTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
