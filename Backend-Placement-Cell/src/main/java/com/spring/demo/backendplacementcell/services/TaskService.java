package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Task;
import com.spring.demo.backendplacementcell.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll ( );
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task) {
        return taskRepository.save ( task );
    }

    public Task updateTask(Long id , Task task) {
        Task existingTask = taskRepository.findById ( id ).orElseThrow ( () -> new RuntimeException ( "Task not found" ) );
        existingTask.setName ( task.getName ( ) );
        existingTask.setDescription ( task.getDescription ( ) );
        existingTask.setPriority ( task.getPriority ( ) );
        existingTask.setDueDate ( task.getDueDate ( ) );
        existingTask.setDueTime ( task.getDueTime ( ) );
        existingTask.setCompleted(task.isCompleted());
        return taskRepository.save ( existingTask );
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById ( id );
    }
}