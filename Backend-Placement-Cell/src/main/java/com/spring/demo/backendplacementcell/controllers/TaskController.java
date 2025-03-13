package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Task;
import com.spring.demo.backendplacementcell.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
//
//@RestController
//@RequestMapping("/api/tasks")
//@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
//public class TaskController {
//
//    @Autowired
//    private TaskService taskService;
//
//    @GetMapping
//    public List<Task> getAllTasks() {
//        return taskService.getAllTasks();
//    }
//
//    @GetMapping("/{id}")
//    public Task getTaskById(@PathVariable Long id) {
//        return taskService.getTaskById(id);
//    }
//
//    @PostMapping
//    public Task createTask(@RequestBody Task task) {
//        return taskService.createTask(task);
//    }
//
//    @PutMapping("/{id}")
//    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
//        return taskService.updateTask(id, task);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteTask(@PathVariable Long id) {
//        taskService.deleteTask(id);
//    }
//}

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app"})
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getMyTasks(Principal principal) {
        return taskService.getTasksForUser(principal.getName()); // principal.getName() is the email from JWT
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id, Principal principal) {
        return taskService.getTaskById(id, principal.getName());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, Principal principal) {
        return taskService.createTask(task, principal.getName());
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task, Principal principal) {
        return taskService.updateTask(id, task, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());
    }
}