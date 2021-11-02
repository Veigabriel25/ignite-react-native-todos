import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import cancelIcon from '../assets/icons/close/close.png';
import penIcon from '../assets/icons/pen/pen.png';

import Icon from 'react-native-vector-icons/Feather';

interface TasksListProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  task: Task;
  index: number;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  task,
  index,
}: TasksListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
    //textInputRef.current?.focus();
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTaskTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsDivider: {
    height: 24,
    marginHorizontal: 12,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
});
