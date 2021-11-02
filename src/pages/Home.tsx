import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const oldTasks = tasks.map((task) => ({ ...task }));

    const sameTask = oldTasks.find((task) => task.title === newTaskTitle);

    if (sameTask) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const tasksAux = tasks.map((task) => ({ ...task }));
    const taskToBeMarked = tasksAux.find((task) => task.id === id);

    if (taskToBeMarked) {
      taskToBeMarked.done = !taskToBeMarked.done;
      setTasks(tasksAux);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find((task) => task.id === taskId);

    if (taskToBeUpdated) {
      taskToBeUpdated.title = taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
