using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
         protected override void Up(MigrationBuilder migrationBuilder)
        { 
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make3')");


            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model1-MakeA',(SELECT Id FROM Makes Where Name='Make1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model1-MakeB',(SELECT Id FROM Makes Where Name='Make1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model1-MakeC',(SELECT Id FROM Makes Where Name='Make1'))");

            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model2-MakeA',(SELECT Id FROM Makes Where Name='Make2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model2-MakeB',(SELECT Id FROM Makes Where Name='Make2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model2-MakeC',(SELECT Id FROM Makes Where Name='Make2'))");

            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model3-MakeA',(SELECT Id FROM Makes Where Name='Make3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model3-MakeB',(SELECT Id FROM Makes Where Name='Make3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name,MakeId) VALUES ('Model3-MakeC',(SELECT Id FROM Makes Where Name='Make3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('Make1','Make2','Make3')");
        }
    }
}
