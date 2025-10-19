import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  AppBar,
  Typography,
  Checkbox,
  Tab,
  Tabs,
  Box,
  useTheme,
} from "@mui/material";

import { setLocalStorage, getLocalStorage } from "../../utils";
import { Button } from "../../components";
import { TabPanelProps } from "../../interface/todotype";
import "./Todo.css";

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
    {value === index && <Box className="tab-panel">{children}</Box>}
  </div>
);

const tabLabelProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

type TaskStatus = "pending" | "completed";
type TaskPriority = "low" | "medium" | "high";
type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};

const priorityColor: Record<TaskPriority, string> = {
  low: "#bde5ff",
  medium: "#ffe8a1",
  high: "#ffb3b3",
};

const TASKS_KEY = "tasks";
const genId = () => Math.random().toString(36).slice(2, 10);

export const Todo = () => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(0); // 0 All, 1 Pending, 2 Completed

  // Form state for create/edit
  const [taskId, setTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("pending");

  const [tasks, setTasks] = useState<Task[]>(() => (getLocalStorage<Task[]>(TASKS_KEY) || []) as Task[]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const resetForm = () => {
    setTaskId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setStatus("pending");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !dueDate) return;
    const now = new Date().toISOString();
    if (taskId) {
      // update
      setTasks((prev) => {
        const next = prev.map((t) => (t.id === taskId ? { ...t, title, description, dueDate, priority, status, updatedAt: now } : t));
        setLocalStorage(TASKS_KEY, next);
        return next;
      });
    } else {
      // create
      const newTask: Task = {
        id: genId(),
        title,
        description,
        dueDate,
        priority,
        status,
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => {
        const next = [...prev, newTask];
        setLocalStorage(TASKS_KEY, next);
        return next;
      });
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      setLocalStorage(TASKS_KEY, next);
      return next;
    });
    if (expandedId === id) setExpandedId(null);
    if (taskId === id) resetForm();
  };

  const startEdit = (t: Task) => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTaskId(t.id);
    setTitle(t.title);
    setDescription(t.description);
    setDueDate(t.dueDate.slice(0, 10));
    setPriority(t.priority);
    setStatus(t.status);
    inputRef.current?.focus();
  };

  const toggleStatus = (t: Task) => {
    const newStatus: TaskStatus = t.status === "completed" ? "pending" : "completed";
    setTasks((prev) => {
      const next = prev.map((x) => (x.id === t.id ? { ...x, status: newStatus, updatedAt: new Date().toISOString() } : x));
      setLocalStorage(TASKS_KEY, next);
      return next;
    });
  };

  const changePriority = (t: Task, p: TaskPriority) => {
    setTasks((prev) => {
      const next = prev.map((x) => (x.id === t.id ? { ...x, priority: p, updatedAt: new Date().toISOString() } : x));
      setLocalStorage(TASKS_KEY, next);
      return next;
    });
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => setValue(newValue);

  const filteredByStatus = useMemo(() => {
    if (value === 1) return tasks.filter((t) => t.status === "pending");
    if (value === 2) return tasks.filter((t) => t.status === "completed");
    return tasks;
  }, [tasks, value]);

  const totalPages = Math.max(1, Math.ceil(filteredByStatus.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = filteredByStatus.slice(startIdx, startIdx + pageSize);

  const gotoPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const renderTodoList = (list: Task[]) =>
    list.length > 0 ? (
      list.map((t) => (
        <div key={t.id} className="list-con" style={{ background: priorityColor[t.priority] }}>
          <label className="label-con">
            <span className="checkpara-con">
              <Checkbox
                className="checkbox-field"
                checked={t.status === "completed"}
                onChange={() => toggleStatus(t)}
              />
              <span className="item-con">{t.title}</span>
            </span>
            <div className="btn-con">
              <Button txt="Details" type="button" click={() => setExpandedId((prev) => (prev === t.id ? null : t.id))} />
              <Button txt="Edit" type="button" click={() => startEdit(t)} />
              <Button txt="Delete" type="button" click={() => handleDelete(t.id)} />
            </div>
          </label>
          {expandedId === t.id && (
            <div className="details">
              <div>Status: {t.status}</div>
              <div>Due: {new Date(t.dueDate).toLocaleDateString()}</div>
              <div>
                Priority:
                <select value={t.priority} onChange={(e) => changePriority(t, e.target.value as TaskPriority)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>Description: {t.description || "-"}</div>
            </div>
          )}
        </div>
      ))
    ) : (
      <Typography className="items-center">No tasks available</Typography>
    );

  // Persist tasks
  useEffect(() => {
    setLocalStorage(TASKS_KEY, tasks);
  }, [tasks]);

  return (
    <div className="outer-con">
      <div className="inner-con">
        <h1>Tasks</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="input-area"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="input-area"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="tab-container" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <Button txt={taskId ? "Save" : "Add"} type="submit" />
            {taskId && <Button txt="Cancel" type="button" click={resetForm} />}
          </div>
        </form>
        <Box className="tab-container">
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="All" {...tabLabelProps(0)} />
              <Tab label="Pending" {...tabLabelProps(1)} />
              <Tab label="Completed" {...tabLabelProps(2)} />
            </Tabs>
          </AppBar>
          {[0, 1, 2].map((index) => (
            <TabPanel value={value} index={index} dir={theme.direction} key={index}>
              {renderTodoList(pageItems)}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
                <Button txt="Prev" type="button" click={() => gotoPage(currentPage - 1)} />
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button txt="Next" type="button" click={() => gotoPage(currentPage + 1)} />
              </div>
            </TabPanel>
          ))}
        </Box>
      </div>
    </div>
  );
};
