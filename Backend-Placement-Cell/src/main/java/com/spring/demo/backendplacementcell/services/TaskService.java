package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Task;
import com.spring.demo.backendplacementcell.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//public class TaskService {
//
//    @Autowired
//    private TaskRepository taskRepository;
//
//    public List<Task> getAllTasks() {
//        return taskRepository.findAll ( );
//    }
//
//    public Task getTaskById(Long id) {
//        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
//    }
//
//    public Task createTask(Task task) {
//        return taskRepository.save ( task );
//    }
//
//    public Task updateTask(Long id , Task task) {
//        Task existingTask = taskRepository.findById ( id ).orElseThrow ( () -> new RuntimeException ( "Task not found" ) );
//        existingTask.setName ( task.getName ( ) );
//        existingTask.setDescription ( task.getDescription ( ) );
//        existingTask.setPriority ( task.getPriority ( ) );
//        existingTask.setDueDate ( task.getDueDate ( ) );
//        existingTask.setDueTime ( task.getDueTime ( ) );
//        existingTask.setCompleted(task.isCompleted());
//        existingTask.setAssignee(task.getAssignee());
//        existingTask.setAssignee(task.getAssignee());
//        return taskRepository.save ( existingTask );
//    }
//
//    public void deleteTask(Long id) {
//        taskRepository.deleteById ( id );
//    }
//}

public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasksForUser(String email) {
        return taskRepository.findByAssignee(email); // Assumes TaskRepository has this method
    }

    public Task getTaskById(Long id, String email) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getAssignee().equals(email)) {
            throw new RuntimeException("You do not have permission to view this task");
        }
        return task;
    }

    public Task createTask(Task task, String email) {
        task.setAssignee(email); // Assign task to the logged-in user
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task, String email) {
        Task existingTask = getTaskById(id, email); // Check permission
        task.setId(id);
        task.setAssignee(email); // Ensure assignee doesn’t change
        return taskRepository.save(task);
    }

    public void deleteTask(Long id, String email) {
        Task task = getTaskById(id, email); // Check permission
        taskRepository.deleteById(id);
    }
}