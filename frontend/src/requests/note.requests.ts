import { gql, DocumentNode } from "@apollo/client";

export const enum TaskRequests {
  CREATE_TASK = "CREATE_TASK",
  COMPLETE_TASK = "COMPLETE_TASK",
  DELETE_TASK = "DELETE_TASK",
  GET_TASKS = "GET_TASKS",
}

interface TaskQueries {
  [TaskRequests.GET_TASKS]: DocumentNode;
}

export const noteQueries: TaskQueries = {
  [TaskRequests.GET_TASKS]: gql`
    query GetTasks {
      tasks {
        id
        title
        completed
      }
    }
  `,
};

interface TaskMutations {
  [TaskRequests.CREATE_TASK]: DocumentNode;
  [TaskRequests.COMPLETE_TASK]: DocumentNode;
  [TaskRequests.DELETE_TASK]: DocumentNode;
}

export const taskMutations: TaskMutations = {
  [TaskRequests.CREATE_TASK]: gql`
    mutation CreateTask($title: String!) {
      createTask(title: $title) {
        task {
          id
          title
          completed
        }
      }
    }
  `,
  [TaskRequests.COMPLETE_TASK]: gql`
    mutation CompleteTask($id: ID!) {
      completeTask(id: $id) {
        task {
          id
          title
          completed
        }
      }
    }
  `,
  [TaskRequests.DELETE_TASK]: gql`
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id) {
        success
      }
    }
  `,
};