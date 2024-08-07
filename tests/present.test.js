const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Presentation = require('../models/presentation');

const newPresentation = {
  title: 'Test Presentation',
  authors: ['Author 1'],
  publishDate: new Date(),
  slides: [
    {
        "title": "Introduction Test",
        "content": "This is the introduction slide.",
        "nameOfAdd": "Author 1"
    }
  ]
};

const newSlide = {
  presentationTitle: 'Test Presentation',
  slideTitle: 'New Test Slide',
  content: 'Test Slide Content',
  name: 'Author Test'
};

const newSlide1 = {
  presentationTitle: 'Test Presentation',
  slideTitle: 'New Test Slide 2',
  content: 'Test Slide Content 2',
  name: 'Author Test 2'
};

beforeAll(async () => {
  await Presentation.deleteMany();
});

afterAll(async () => {
  mongoose.connection.close();
});

describe('Presentation Tests', () => {
  test('create new presentation', async () => {
    const response = await request(app).post('/presentations').send(newPresentation);
    expect(response.statusCode).toEqual(200);
    expect(response.body.title).toEqual(newPresentation.title);
  });


  test('try create new presentation with same title', async () => {
    const response = await request(app).post('/presentations').send(newPresentation);
    expect(response.statusCode).toEqual(400);
    expect(response.text).toEqual('Title is exist - title need be unique');
  });


  test('get a presentation by title', async () => {
    const response = await request(app).get('/presentations/title').send({ 'title': newPresentation.title});
    expect(response.statusCode).toEqual(200);
    expect(response.body.title).toEqual(newPresentation.title);
  });


  test('get all presentations', async () => {
    const response = await request(app).get('/presentations');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });


  test('add new authors in presentation ', async () => {
    const response = await request(app).put('/presentations/authors')
    .send({ title: 'Test Presentation', authors: ['New Author']});
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Authors List updated');
  });


  test('add a slide to presentation', async () => {
    const response = await request(app).post('/presentations/slides').send(newSlide);
    expect(response.statusCode).toEqual(200);
    expect(response.body.slides.length).toBeGreaterThan(0);
  });


  test('add second slide to presentation', async () => {
    const response = await request(app).post('/presentations/slides').send(newSlide1);
    expect(response.statusCode).toEqual(200);
  });


  test('delete presentation', async () => {
    const response = await request(app).delete('/presentations').send({ 'title': newPresentation.title });
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Presentation deleted');
  });
});
