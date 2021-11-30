import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import data from "src/assets/samtc_results.json";

@Component({
  selector: "app-results-page",
  templateUrl: "./results-page.component.html",
  styleUrls: ["./results-page.component.scss"],
})
export class ResultsPageComponent implements OnInit {
  searchText;
  searchRec;
  err;
  mainJson: Record[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.mainJson = data;
    //this.getData();
  }

  getData() {
    this.http
      .get("assets/samtc_results.csv", { responseType: "text" })
      .subscribe(
        (data) => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.mainJson.push(
              new Record(
                parseInt(row[0]),
                row[1],
                parseInt(row[2]),
                row[3],
                row[4],
                row[5],
                row[6],
                row[7]
              )
            );
          }
          console.log(this.mainJson);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  search() {
    if (this.searchText) {
      this.err = null;
      this.searchRec = this.mainJson.filter(
        (x) => x.Roll_No == this.searchText
      )[0];
      if (!this.searchRec) {
        this.err = "No record found";
      }
    } else {
      this.err = "No record found";
    }
  }
}
export class Record {
  Roll_No: number;
  Name: String;
  Class: number;
  School: String;
  Score: number;
  Result: String;
  Message: String;
  Download: String;

  constructor(
    rollno: number,
    name: String,
    class_name: number,
    school,
    score,
    result,
    message,
    download
  ) {
    this.Roll_No = rollno;
    this.Name = name;
    this.Class = class_name;
    this.School = school;
    this.Score = score;
    this.Result = result;
    this.Message = message;
    this.Download = download;
  }
}
