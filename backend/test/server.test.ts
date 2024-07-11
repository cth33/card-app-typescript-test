import { server } from "../src/server"
import Prisma from "../src/db";


jest.mock("../src/db", () => ({
  entry: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Create Entry Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an entry with all fields provided", async () => {
    const mockEntry = {
      title: "Test Entry",
      description: "This is a test entry",
      created_at: new Date("11-07-2024"),
      scheduled_at: new Date("12-07-2024"),
    };

    (Prisma.entry.create as jest.Mock).mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(200);
    const createdEntry = JSON.parse(response.payload);
    expect(createdEntry.title).toBe(mockEntry.title);
    expect(createdEntry.description).toBe(mockEntry.description);
    expect(new Date(createdEntry.created_at)).toEqual(mockEntry.created_at);
    expect(new Date(createdEntry.scheduled_at)).toEqual(mockEntry.scheduled_at);
  });

  it("should create an entry with default dates", async () => {
    const mockEntry = {
      title: "Test Entry",
      description: "This is a test entry",
      created_at: new Date(),
      scheduled_at: new Date(),
    };

    (Prisma.entry.create as jest.Mock).mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(200);
    const createdEntry = JSON.parse(response.payload);
    expect(createdEntry.title).toBe(mockEntry.title);
    expect(createdEntry.description).toBe(mockEntry.description);
    expect(new Date(createdEntry.created_at)).toEqual(mockEntry.created_at);
    expect(new Date(createdEntry.scheduled_at)).toEqual(mockEntry.scheduled_at);
  });

  it("should return a 500 error when creation fails", async () => {
    const mockEntry = {
      title: "Test Entry",
      description: "This is a test entry",
    };

    (Prisma.entry.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.payload)).toEqual({ msg: "Error creating entry" });
  });
});

describe("Get Get Entry Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 500 error when id does not exist", async () => {
    (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await server.inject({
        method: "GET",
        url: "/get/1",
      });

      expect(response.statusCode).toBe(500);
  });

  it("should return all entries", async () => {
    const mockEntries = [
      {id: "1", title: "Entry 1", description: "Description 1", created_at: "2024-07-11", scheduled_at: "2024-07-12"},
      {id: "2", title: "Entry 2", description: "Description 2", created_at: "2024-07-11", scheduled_at: "2024-07-12"},
    ];

    (Prisma.entry.findMany as jest.Mock).mockResolvedValue(mockEntries);

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockEntries);
  });

  it("should return a specific entry if it exists", async () => {
    const mockEntry = {id: "1", title: "Test Entry", description: "Test Description", created_at: "2024-07-11", scheduled_at: "2024-07-12"};

    (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "GET",
      url: "/get/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockEntry);
  });
  
});

describe("Update Entry Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update an entry with all fields provided", async () => {
    const mockEntry = {
      title: "Updated Entry",
      description: "This is an updated entry",
      created_at: new Date("11-07-2024"),
      scheduled_at: new Date("12-07-2024"),
    };

    (Prisma.entry.update as jest.Mock).mockResolvedValue(mockEntry);

    const response = await server.inject({
      method: "PUT",
      url: "/update/1",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({msg: "Updated successfully"});
  });

  it("should return a 500 error when update fails", async () => {
    const mockEntry = {
      title: "Updated Entry",
      description: "This is an updated entry",
      created_at: new Date("11-07-2024"),
      scheduled_at: new Date("12-07-2024"),
    };

    (Prisma.entry.update as jest.Mock).mockRejectedValue(new Error("Update failed"));

    const response = await server.inject({
      method: "PUT",
      url: "/update/1",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.payload)).toEqual({msg: "Error updating"});
  });
});

describe("Delete Entry given ID", () => {
  it("should delete an entry successfully", async () => {
    (Prisma.entry.delete as jest.Mock).mockResolvedValue({id: "1"});

    const response = await server.inject({
      method: "DELETE",
      url: "/delete/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({msg: "Deleted successfully"});
  });

  it("should return a 500 error when deletion fails", async () => {
    (Prisma.entry.delete as jest.Mock).mockRejectedValue(new Error("Deletion failed"));

    const response = await server.inject({
      method: "DELETE",
      url: "/delete/1",
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.payload)).toEqual({ msg: "Error deleting entry" });
  });
});