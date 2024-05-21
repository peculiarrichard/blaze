import schedule from "node-schedule";

const scheduledJobs: { [key: string]: schedule.Job } = {};

export function addJob(id: string, job: schedule.Job) {
  scheduledJobs[id] = job;
}

export function getJob(id: string) {
  return scheduledJobs[id];
}

export function removeJob(id: string) {
  delete scheduledJobs[id];
}