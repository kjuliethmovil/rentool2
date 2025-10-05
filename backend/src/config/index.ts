import express, { Application } from "express";

// Load environment variables from the .env file

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();

  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }


  // Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}